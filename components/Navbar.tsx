
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-[#e5e7eb] dark:border-[#243e2c] px-4 py-3 md:px-10 transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-8">
          <Link to="/" className="flex items-center gap-2 text-[#111813] dark:text-white group">
            <div className="size-8 text-primary">
              <span className="material-symbols-outlined text-4xl">pets</span>
            </div>
            <h2 className="hidden text-xl font-extrabold tracking-tight sm:block group-hover:text-primary transition-colors">Paws & Claws</h2>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-9">
            <Link to="/shop" className={`text-sm font-semibold transition-colors ${isActive('/shop') ? 'text-primary' : 'text-[#111813] dark:text-gray-200 hover:text-primary'}`}>商店</Link>
            <Link to="/shop?cat=Grooming" className="text-sm font-semibold text-[#111813] dark:text-gray-200 hover:text-primary transition-colors">美容</Link>
            <Link to="/shop?cat=Food" className="text-sm font-semibold text-[#111813] dark:text-gray-200 hover:text-primary transition-colors">食品</Link>
            <Link to="/shop?cat=Toys" className="text-sm font-semibold text-[#111813] dark:text-gray-200 hover:text-primary transition-colors">玩具</Link>
            <Link to="/orders" className="text-sm font-semibold text-[#111813] dark:text-gray-200 hover:text-primary transition-colors">订单</Link>
          </div>
        </div>

        <div className="flex flex-1 justify-end gap-4 lg:gap-6 items-center">
          <div className="hidden lg:flex items-center bg-neutral-light dark:bg-neutral-dark rounded-full px-4 py-2 border border-transparent focus-within:border-primary/30 transition-all w-full max-w-xs">
            <span className="material-symbols-outlined text-gray-500 mr-2 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="搜索商品..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 placeholder-gray-400 dark:text-white"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Link to="/cart" className="relative group flex items-center justify-center rounded-lg h-10 w-10 bg-neutral-light dark:bg-neutral-dark hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-[#111813] dark:text-white group-hover:text-primary">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-[#111813] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center ring-2 ring-surface-light dark:ring-surface-dark">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link to="/auth" className="group flex items-center justify-center rounded-lg h-10 w-10 bg-neutral-light dark:bg-neutral-dark hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-[#111813] dark:text-white group-hover:text-primary">
                {user ? 'account_circle' : 'login'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
