
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark border border-transparent dark:border-[#243e2c] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-neutral-dark">
        <img 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
          src={product.image} 
        />
        {product.tags?.map(tag => (
          <div key={tag} className={`absolute right-3 top-3 rounded-full px-2 py-1 text-[10px] font-bold shadow-sm ${
            tag === 'Sale' ? 'bg-red-500 text-white' : 
            tag === 'Best Seller' ? 'bg-white text-black' : 
            'bg-primary text-[#111813]'
          }`}>
            {tag}
          </div>
        ))}
        <button 
          onClick={(e) => {
            e.preventDefault();
            onAdd(product);
          }}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[#111813] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
        </button>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-yellow-400 fill-current">star</span>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{product.rating} ({product.reviews})</span>
          </div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
        </div>
        
        <h3 className="mb-1 text-lg font-bold text-[#111813] dark:text-white group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto flex items-center gap-2">
          <span className="text-xl font-black text-[#111813] dark:text-white">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
