# AGENTS.md

This file contains guidelines for agentic coding agents working in the Paws & Claws Pet Shop repository.

## Build & Development Commands

```bash
npm run dev        # Start development server on port 3000
npm run build      # Build for production
npm run preview    # Preview production build
```

**Note:** No test framework is currently set up. Add test commands if implementing tests.

## Tech Stack

- **Frontend:** React 19.2.4 + TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0
- **Routing:** React Router DOM 7.13.0 (HashRouter)
- **Backend/Auth:** Supabase
- **Payments:** Stripe
- **Icons:** Google Material Symbols

## Project Structure

```
/                        # Root directory
├── App.tsx             # Main app component with routing
├── index.tsx           # Entry point
├── types.ts            # TypeScript type definitions
├── constants.tsx       # Product data constants
├── supabaseClient.ts   # Supabase client configuration
├── components/         # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
└── pages/             # Route components
    ├── HomePage.tsx
    ├── ShopPage.tsx
    ├── AuthPage.tsx
    ├── CartPage.tsx
    └── PaymentPage.tsx
```

## Code Style Guidelines

### Imports

- Group imports in this order: React → third-party libraries → local modules
```tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
```

- Use absolute imports with `@/` alias for root directory files
```tsx
import { supabase } from '@/supabaseClient';
```

### Components

- Use functional components with `React.FC` type annotation
```tsx
interface ComponentProps {
  user: UserProfile | null;
}

const Component: React.FC<ComponentProps> = ({ user }) => {
  return <div>...</div>;
};

export default Component;
```

- Define component interfaces immediately above the component
- Use descriptive prop names (e.g., `addToCart` instead of `handler`)

### TypeScript

- All types are defined in `types.ts`
- Use existing types: `Product`, `CartItem`, `UserProfile`, `Order`, `Category`
- Define new types in `types.ts` when needed
- Use strict typing for all props, state, and function returns

### State Management

- Use React hooks: `useState`, `useEffect`, `useCallback`
- State updates should be immutable
```tsx
const [cart, setCart] = useState<CartItem[]>([]);

setCart(prev => [...prev, newItem]);  // Good
setCart([...cart, newItem]);          // Acceptable for simple cases
```

### Naming Conventions

- **Components:** PascalCase (e.g., `ProductCard`, `Navbar`)
- **Functions/Variables:** camelCase (e.g., `addToCart`, `fetchOrders`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `PRODUCTS`, `SUPABASE_URL`)
- **Types/Interfaces:** PascalCase (e.g., `UserProfile`, `Product`)

### Styling

- Use Tailwind CSS classes directly
- Support both light and dark modes with `dark:` prefix
```tsx
<div className="bg-white dark:bg-background-dark text-gray-800 dark:text-white">
```

- Use utility classes for layout: `flex`, `grid`, `flex-col`, `items-center`
- Material Symbols icons: `<span className="material-symbols-outlined">pets</span>`

### Error Handling

- Check for Supabase config existence before operations
```tsx
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase configuration missing');
  return <div>Configuration Error</div>;
}
```

- Use try-catch for async operations
- Provide user-friendly error messages in Chinese to match UI language

### Supabase Integration

- Use `supabaseClient.ts` export: `import { supabase } from '@/supabaseClient'`
- Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY` in `.env.local`
- Auth state management: use `supabase.auth.onAuthStateChange()`
- Session management: `supabase.auth.getSession()`

### Routing

- Use `HashRouter` in App.tsx
- Route paths are prefixed with `/`
```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/shop" element={<ShopPage />} />
</Routes>
```

### UI Language

- All user-facing text should be in Chinese (Simplified)
- Variable names and code comments can be in English

### Database

- Table schemas are in `.sql` files (e.g., `create_orders_table.sql`)
- When adding new tables, create schema files in root directory
- Order status: 'pending' | 'completed' | 'cancelled'

### General Rules

- Keep components focused on single responsibility
- Avoid inline styles; use Tailwind classes
- Use semantic HTML elements (`<header>`, `<main>`, `<section>`, `<nav>`)
- Maintain consistent spacing (padding/margins) using Tailwind
- Add loading states for async operations
- Handle empty states gracefully

### When Adding Features

1. Define types in `types.ts` if new data structures needed
2. Create components in `components/` if reusable
3. Create pages in `pages/` if new routes
4. Add routes to `App.tsx`
5. Update navigation in `Navbar.tsx` if user-accessible
6. Test both light and dark modes
7. Ensure mobile responsiveness (use Tailwind breakpoints: `md:`, `lg:`)

### Environment Variables

Required in `.env.local`:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```
