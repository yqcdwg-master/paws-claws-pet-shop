
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  addToCart: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addToCart }) => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-white dark:bg-background-dark overflow-hidden py-10 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-extrabold tracking-widest uppercase text-sm block">优质宠物用品</span>
              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-[#111813] dark:text-white">
                宠爱您的 <span className="text-primary">毛茸茸的朋友</span> 就在今天
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                为快乐健康的宠物提供所需的一切。从优质有机食品到专业的美容服务，让它们开心摇尾巴。
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="px-8 py-4 bg-primary hover:bg-primary-dark text-[#111813] font-bold rounded-full transition-all shadow-lg shadow-primary/20 hover:scale-105">
                立即购买
              </Link>
              <Link to="/shop?cat=Grooming" className="px-8 py-4 bg-white dark:bg-transparent border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-full transition-all">
                预约美容
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="size-10 rounded-full border-2 border-white dark:border-surface-dark" alt="User" />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">超过 10,000 位宠物家长的信赖</p>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfOcP66cR8lKrFC68P9Zh-5vBrHlDfqSV1Ob2Om1AQgwcHUXk1z9TMk4WCEKQlH_UWCv0kj9KzgmYUBKPaF4BoM80Te5lt4XoPMsybDW9BOHZi5M8HfPhDX9BnKtGlB2r0rwENrKaRddihgUN55zF-TgrH4f0HzviJHJRh4DE_JaE7bxi9M4c0JoB1h-vleZCJ4fPI1I5YpPsLBhBu0qyO0E-zA8POdt4aOhtuAARFjFpVC1FkDfI4rhZfeMwQqdP1MaRSikVaxA" 
              className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]" 
              alt="Happy Pets" 
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-neutral-light dark:bg-[#0c1a10]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12 space-y-2">
            <span className="text-primary font-bold uppercase tracking-wider text-xs">分类</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#111813] dark:text-white">您的宠物需要什么？</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Grooming Spa', displayName: '美容水疗', desc: '专业清洗和造型', icon: 'spa', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOZq54fNKYk9tcIiGkboay4VcxV2e_MoscGOxpXxEE8hF38gM0LVwx889t65giEuBtgDjNc3WQb_tCBpFNAyY3odAY2fOpTDZWoqbyg082SwJRBKkED0nQ-z1OrL6M5CaRqDrwTIGQdw4c8Tu_ALmRjV-Ry6-1wZDwisw7v2Jtz2tH1rYvhbCXNimVkDZl0uCFI-Qbs3UuOyHFw4A7rFWxv41hzTuOBtWPRR6rtYPiWNXUSeSuWcQm2al7LWPFceaLeUTPmQBMXw' },
              { name: 'Premium Food', displayName: '优质食品', desc: '有机膳食，健康长寿', icon: 'restaurant', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo37aShiyqxxlmCdX6wVuz0LW-pDjbwArXlDzfLaWo66iK6WT3ydkNiuxafVdeCCFiWJyAWqfkcyH1v6zWdJ9CjyHdr5D7eTtU94jeDL7PBJeHcI9BcgsC9AmZYEXigdAHyG2FtcY0TisYPuMaoF6mkR6hrZcy8iD9x9i-ZdcM60J0SrSV9c19kHdvNK8vs2ppsI3Uqfrla_aJO6_vbtdu3_0JL83ntsiqLw4RjdiVwCVCzQnRDvSdn1YJzc7PtU2r3ET6SAOZGQ' },
              { name: 'Fun Toys', displayName: '趣味玩具', desc: '互动游戏装备', icon: 'sports_baseball', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9-jXtPwor4Wwy9gQRKWEZ2TLABnltVoguu1-6kGj33P5Tq6-QUGlopv3HP65yCX4xU8vtd-wzWs3chKWO_Zl8wQGM7G7Nl6n2SvmNnbw3DuEJfuBUw2F5GB2q6NVa7gXeONaewA0ugbpn8G4nlfKJUcWqiK9rgRRJV2nzIlxrSfN74MMSEaWTk1hVpdzRnnR3SnModKvzCBn8Lg8LqCMZ18HpAjzWlJMezz-qrks_sf0q2RCpP1lo80VqoBkMrEGJLP8DPo6WvQ' },
            ].map(cat => (
              <Link to={`/shop?cat=${cat.name.split(' ')[1] || cat.name}`} key={cat.name} className="group relative overflow-hidden rounded-3xl bg-surface-light dark:bg-surface-dark shadow-lg hover:shadow-2xl transition-all h-[300px]">
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.displayName} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">{cat.icon}</span>
                    <h3 className="text-xl font-bold">{cat.displayName}</h3>
                  </div>
                  <p className="text-sm text-gray-300">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-[#111813] dark:text-white">精选产品</h2>
            <p className="text-gray-500 mt-2">为您心爱伙伴的精选推荐</p>
          </div>
          <Link to="/shop" className="text-primary font-bold flex items-center gap-1 hover:underline">
            查看全部 <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto bg-primary rounded-[3rem] overflow-hidden relative p-8 md:p-16 flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="z-10 flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-[#111813]">Join our Furry Family!</h2>
            <p className="text-[#111813]/80 text-lg max-w-md">Subscribe to our newsletter and get 15% off your first order plus expert pet care tips.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email" className="flex-1 rounded-2xl border-none focus:ring-2 focus:ring-[#111813]/20 py-4 px-6" />
              <button className="bg-[#111813] text-white font-bold py-4 px-8 rounded-2xl hover:bg-gray-800 transition-colors">Subscribe</button>
            </div>
          </div>
          <div className="hidden md:flex justify-center flex-1">
            <span className="material-symbols-outlined text-[120px] text-white/40 rotate-12">mark_email_unread</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
