
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartItem, UserProfile } from '../types';
import { supabase } from '../supabaseClient';

interface CartPageProps {
  user: UserProfile | null;
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ user, cart, removeFromCart, updateQuantity, clearCart }) => {
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check if Supabase is properly configured before proceeding
    const isConfigured = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!isConfigured) {
      alert("Store configuration is incomplete. Missing Supabase keys.");
      return;
    }

    setCheckoutLoading(true);

    try {
      // Simulate Stripe checkout (sandbox)
      // In a real production app, you would use the Stripe SDK and a backend endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save order to Supabase
      const { data, error } = await supabase.from('orders').insert({
        user_id: user.id,
        total: total,
        status: 'completed',
        items: cart, // Store the cart JSON
        created_at: new Date().toISOString(),
      }).select();

      if (error) {
        // If the table doesn't exist yet, we still simulate success for the UI demo
        if (error.code === '42P01') { 
          console.warn("Orders table not found in Supabase. Proceeding with UI success state.");
        } else {
          throw error;
        }
      }

      setOrderComplete(true);
      clearCart();
    } catch (err: any) {
      console.error("Checkout failed:", err);
      alert(`支付处理失败: ${err.message || '未知错误'}`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 animate-fade-in text-center space-y-8">
        <div className="size-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-xl shadow-primary/20">
          <span className="material-symbols-outlined text-5xl text-[#111813]">check</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-[#111813] dark:text-white">订单已确认！</h1>
          <p className="text-gray-500 max-w-md mx-auto">您毛茸茸朋友的商品正在途中。我们已将收据发送到您的电子邮件。</p>
        </div>
        <Link to="/shop" className="inline-block px-10 py-4 bg-[#111813] text-white dark:bg-primary dark:text-[#111813] font-bold rounded-2xl hover:opacity-90 transition-all">
          继续购物
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 animate-fade-in text-center space-y-6">
        <span className="material-symbols-outlined text-8xl text-gray-200">shopping_cart</span>
        <h1 className="text-3xl font-black text-[#111813] dark:text-white">您的购物车是空的</h1>
        <p className="text-gray-500">看起来您的宠物正在等待特别的礼物！</p>
        <Link to="/shop" className="inline-block px-10 py-4 bg-primary text-[#111813] font-bold rounded-2xl hover:bg-primary-dark transition-all">
          浏览商店
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 animate-fade-in">
      <h1 className="text-4xl font-black text-[#111813] dark:text-white mb-10">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-hover hover:shadow-md">
              <img src={item.image} className="size-24 rounded-2xl object-cover" alt={item.name} />
              
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-[#111813] dark:text-white">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                <p className="text-primary font-bold text-lg">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-4 bg-neutral-light dark:bg-neutral-dark p-2 rounded-2xl">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="size-8 bg-white dark:bg-surface-dark rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined text-sm text-[#111813] dark:text-white">remove</span>
                </button>
                <span className="font-bold w-4 text-center text-[#111813] dark:text-white">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="size-8 bg-white dark:bg-surface-dark rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined text-sm text-[#111813] dark:text-white">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-[400px]">
          <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg sticky top-32 space-y-6">
            <h2 className="text-2xl font-black text-[#111813] dark:text-white">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-[#111813] dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className={`font-bold ${shipping === 0 ? 'text-primary' : 'text-[#111813] dark:text-white'}`}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (8%)</span>
                <span className="font-bold text-[#111813] dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-end">
                <span className="text-lg font-bold text-[#111813] dark:text-white">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full py-4 bg-primary hover:bg-primary-dark text-[#111813] font-black rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {checkoutLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">sync</span>
                  Processing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">lock</span>
                  Secure Checkout
                </>
              )}
            </button>
            
            {!user && (
              <p className="text-xs text-center text-gray-400">Please <Link to="/auth" className="text-primary font-bold hover:underline">login</Link> to complete your order.</p>
            )}

            <div className="flex items-center justify-center gap-2 pt-4 opacity-40">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-4" alt="Stripe" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#111813] dark:text-white">Sandbox Mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
