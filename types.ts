
export type Category = 'All' | 'Grooming' | 'Food' | 'Toys';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  petName?: string;
  petType?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: CartItem[];
  created_at: string;
}
