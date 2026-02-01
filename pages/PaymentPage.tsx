import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const CheckoutForm = ({ total }: { total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement as unknown as StripeCardElement,
      });

      if (error) {
        setError(error.message || 'Payment failed');
        setProcessing(false);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        // Simulate payment success
        setTimeout(() => {
            setProcessing(false);
            alert('Payment Successful!');
            navigate('/'); // Or to a success page
        }, 1000);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-4 bg-primary hover:bg-primary-dark text-[#111813] font-black rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {processing ? (
          <>
            <span className="material-symbols-outlined animate-spin">sync</span>
            Processing...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">credit_card</span>
            Pay ${total.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
};

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { total } = location.state || { total: 0 };
  
  if (total === 0) {
      return (
          <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
              <h1 className="text-2xl font-bold text-red-500">Invalid Order</h1>
          </div>
      )
  }

  return (
    <div className="max-w-[600px] mx-auto px-6 py-10 animate-fade-in">
      <h1 className="text-3xl font-black text-[#111813] dark:text-white mb-8 text-center">Secure Payment</h1>
      
      <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg">
        <div className="mb-8 text-center">
            <p className="text-gray-500 mb-2">Total Amount</p>
            <p className="text-4xl font-black text-primary">${total.toFixed(2)}</p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} />
        </Elements>
        
        <div className="mt-6 flex items-center justify-center gap-2 opacity-50">
           <span className="material-symbols-outlined text-sm">lock</span>
           <span className="text-xs">Payments secured by Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
