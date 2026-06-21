-- ============================================================
-- FILE: supabase/migrations/005_indexes.sql
-- ============================================================

-- Products
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_search ON public.products USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON public.products(is_best_seller) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON public.products(is_new_arrival) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_tags ON public.products USING GIN(tags);

-- Orders
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- Reviews
CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_reviews_user ON public.reviews(user_id);

-- Blog
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON public.blog_posts(published_at DESC) WHERE is_published = true;

-- Analytics
CREATE INDEX IF NOT EXISTS idx_analytics_event ON public.analytics_events(event_name, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics_events(created_at DESC);
