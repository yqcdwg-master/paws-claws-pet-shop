
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#0a160e] pt-16 pb-8 border-t border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-text-dark dark:text-white">
              <span className="material-symbols-outlined text-4xl text-primary">pets</span>
              <span className="text-2xl font-black tracking-tight">Paws & Claws</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Making pet parenting easier, one happy tail at a time. Quality products for the pets you love.
            </p>
          </div>
          
          <div>
            <h3 className="font-black text-lg mb-6 text-[#111813] dark:text-white">Shop</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/shop?cat=Food" className="hover:text-primary transition-colors">Food & Treats</Link></li>
              <li><Link to="/shop?cat=Toys" className="hover:text-primary transition-colors">Toys & Accessories</Link></li>
              <li><Link to="/shop?cat=Grooming" className="hover:text-primary transition-colors">Grooming Supplies</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-black text-lg mb-6 text-[#111813] dark:text-white">Services</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Grooming Salon</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Veterinary Care</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Training Classes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pet Boarding</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-black text-lg mb-6 text-[#111813] dark:text-white">Contact</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                123 Puppy Lane, Pet City
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">call</span>
                (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                hello@pawsandclaws.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">© 2024 Paws & Claws. All rights reserved.</p>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">facebook</span></a>
            <a href="#" className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">camera</span></a>
            <a href="#" className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">alternate_email</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
