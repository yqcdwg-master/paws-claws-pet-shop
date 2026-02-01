-- Create the orders table
create table public.orders (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  stripe_payment_intent_id text,
  total numeric not null,
  subtotal numeric not null,
  shipping numeric not null default 0,
  tax numeric not null default 0,
  status text not null check (status in ('pending', 'completed', 'failed', 'cancelled')),
  items jsonb not null,
  customer_email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.orders enable row level security;

-- Create policies
create policy "Users can insert their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);
  
-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_orders_updated_at
  before update on public.orders
  for each row
  execute function update_updated_at_column();