
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile, Order, CartItem } from '../types';
import { supabase } from '../supabaseClient';

interface OrdersPageProps {
  user: UserProfile | null;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const isConfigured = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!isConfigured) {
        throw new Error('数据库配置未完成');
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          setError('订单表不存在，请联系管理员');
        } else {
          throw error;
        }
      } else if (data) {
        const mappedOrders = data.map((order: any) => ({
          id: order.id,
          user_id: order.user_id,
          total: order.total,
          status: order.status as 'pending' | 'completed' | 'cancelled',
          items: order.items as CartItem[],
          created_at: order.created_at,
        }));
        setOrders(mappedOrders);
      }
    } catch (err: any) {
      console.error('获取订单失败:', err);
      setError(err.message || '获取订单失败');
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待处理';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      case 'failed':
        return '支付失败';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!user) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 animate-fade-in text-center space-y-6">
        <span className="material-symbols-outlined text-8xl text-gray-200">login</span>
        <h1 className="text-3xl font-black text-[#111813] dark:text-white">请先登录</h1>
        <p className="text-gray-500">登录后即可查看您的订单</p>
        <Link to="/auth" className="inline-block px-10 py-4 bg-primary text-[#111813] font-bold rounded-2xl hover:bg-primary-dark transition-all">
          立即登录
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 animate-fade-in flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-5xl text-primary animate-spin">sync</span>
        <p className="font-bold text-gray-500">加载订单中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 animate-fade-in text-center space-y-6">
        <span className="material-symbols-outlined text-8xl text-red-200">error</span>
        <h1 className="text-3xl font-black text-[#111813] dark:text-white">加载失败</h1>
        <p className="text-gray-500">{error}</p>
        <button 
          onClick={fetchOrders}
          className="inline-block px-10 py-4 bg-primary text-[#111813] font-bold rounded-2xl hover:bg-primary-dark transition-all"
        >
          重新加载
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 animate-fade-in text-center space-y-6">
        <span className="material-symbols-outlined text-8xl text-gray-200">receipt</span>
        <h1 className="text-3xl font-black text-[#111813] dark:text-white">暂无订单</h1>
        <p className="text-gray-500">您还没有任何订单，快去商城选购吧！</p>
        <Link to="/shop" className="inline-block px-10 py-4 bg-primary text-[#111813] font-bold rounded-2xl hover:bg-primary-dark transition-all">
          浏览商品
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10 animate-fade-in">
      <h1 className="text-4xl font-black text-[#111813] dark:text-white mb-10">我的订单</h1>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">订单号</span>
                <span className="font-mono font-bold text-[#111813] dark:text-white">{order.id.slice(0, 8)}...</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
                <span className="text-sm text-gray-500">{formatDate(order.created_at)}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img src={item.image} className="size-16 rounded-xl object-cover" alt={item.name} />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#111813] dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-[#111813] dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="text-right">
                <span className="text-sm text-gray-500">订单总计</span>
                <div className="text-2xl font-black text-primary">
                  ${order.total.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
