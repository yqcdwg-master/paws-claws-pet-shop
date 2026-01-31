
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, Category } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

interface ShopPageProps {
  addToCart: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  
  useEffect(() => {
    const cat = searchParams.get('cat') as Category;
    if (cat && ['Grooming', 'Food', 'Toys', 'All'].includes(cat)) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const filteredProducts = PRODUCTS.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  const categories: Category[] = ['All', 'Grooming', 'Food', 'Toys'];
  
  const categoryNames: Record<string, string> = {
    'All': '全部',
    'Grooming': '美容',
    'Food': '食品',
    'Toys': '玩具'
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-[#111813] dark:text-white">选购所有商品</h1>
            <p className="text-gray-500">从我们精心挑选的系列中为您的宠物寻找完美产品。</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSearchParams({ cat })}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary text-[#111813] shadow-md shadow-primary/20' 
                    : 'bg-neutral-light dark:bg-neutral-dark text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {categoryNames[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-gray-300">inventory_2</span>
              <p className="text-gray-500 font-medium text-xl">此分类下未找到产品。</p>
              <button onClick={() => setSearchParams({ cat: 'All' })} className="text-primary font-bold underline">显示所有产品</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
