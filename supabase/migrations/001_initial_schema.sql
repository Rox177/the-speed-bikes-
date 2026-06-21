-- ============================================================
-- FILE: supabase/migrations/001_initial_schema.sql
-- ============================================================

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================================
-- PROFILES TABLE (extends auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  full_name       TEXT,
  avatar_url      TEXT,
  phone           TEXT,
  date_of_birth   DATE,
  role            TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  is_verified     BOOLEAN DEFAULT false,
  newsletter_opt  BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ADDRESSES TABLE
-- ============================================================
CREATE TABLE public.addresses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  line1           TEXT NOT NULL,
  line2           TEXT,
  city            TEXT NOT NULL,
  state           TEXT NOT NULL,
  postal_code     TEXT NOT NULL,
  country         TEXT NOT NULL DEFAULT 'US',
  is_default      BOOLEAN DEFAULT false,
  label           TEXT DEFAULT 'Home',
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- BRANDS TABLE
-- ============================================================
CREATE TABLE public.brands (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL UNIQUE,
  slug            TEXT NOT NULL UNIQUE,
  logo_url        TEXT,
  banner_url      TEXT,
  description     TEXT,
  country         TEXT,
  website_url     TEXT,
  is_featured     BOOLEAN DEFAULT false,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- CATEGORIES TABLE (hierarchical)
-- ============================================================
CREATE TABLE public.categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id       UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  image_url       TEXT,
  icon_name       TEXT,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INTEGER DEFAULT 0,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- PRODUCTS TABLE
-- ============================================================
CREATE TABLE public.products (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id            UUID REFERENCES public.brands(id) ON DELETE SET NULL,
  category_id         UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name                TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  tagline             TEXT,
  description         TEXT,
  short_description   TEXT,
  price               NUMERIC(10,2) NOT NULL,
  compare_price       NUMERIC(10,2),
  cost_price          NUMERIC(10,2),
  sku                 TEXT UNIQUE,
  barcode             TEXT,
  
  -- Physical attributes
  weight_kg           NUMERIC(6,2),
  color               TEXT,
  frame_material      TEXT,
  
  -- E-Bike specific fields
  motor_power_w       INTEGER,
  battery_voltage_v   NUMERIC(6,1),
  battery_capacity_wh NUMERIC(8,1),
  max_range_km        NUMERIC(8,1),
  max_speed_kmh       NUMERIC(6,1),
  charge_time_hours   NUMERIC(4,1),
  motor_type          TEXT,
  assist_levels       INTEGER,
  display_type        TEXT,
  brake_type          TEXT,
  suspension          TEXT,
  wheel_size_in       NUMERIC(4,1),
  gear_count          INTEGER,
  frame_sizes         TEXT[],
  ip_rating           TEXT,
  
  -- Media
  thumbnail_url       TEXT,
  image_urls          TEXT[] DEFAULT '{}',
  video_url           TEXT,
  
  -- Status & visibility
  is_active           BOOLEAN DEFAULT true,
  is_featured         BOOLEAN DEFAULT false,
  is_best_seller      BOOLEAN DEFAULT false,
  is_new_arrival      BOOLEAN DEFAULT false,
  
  -- Inventory
  stock_quantity      INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  track_inventory     BOOLEAN DEFAULT true,
  
  -- Warranty
  warranty_years      INTEGER DEFAULT 2,
  warranty_notes      TEXT,
  
  -- SEO
  meta_title          TEXT,
  meta_description    TEXT,
  tags                TEXT[] DEFAULT '{}',
  
  -- Ratings (denormalized for performance)
  avg_rating          NUMERIC(3,2) DEFAULT 0,
  review_count        INTEGER DEFAULT 0,
  
  -- Timestamps
  published_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now(),
  
  -- Full-text search vector
  search_vector       TSVECTOR
);

-- ============================================================
-- PRODUCT VARIANTS TABLE
-- ============================================================
CREATE TABLE public.product_variants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  sku             TEXT,
  price           NUMERIC(10,2),
  compare_price   NUMERIC(10,2),
  stock_quantity  INTEGER DEFAULT 0,
  color           TEXT,
  size            TEXT,
  frame_size      TEXT,
  image_url       TEXT,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- PRODUCT SPECIFICATIONS TABLE (key-value pairs)
-- ============================================================
CREATE TABLE public.product_specs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  spec_group  TEXT NOT NULL,
  spec_key    TEXT NOT NULL,
  spec_value  TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0
);

-- ============================================================
-- REVIEWS TABLE
-- ============================================================
CREATE TABLE public.reviews (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id        UUID,
  rating          INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title           TEXT NOT NULL,
  body            TEXT NOT NULL,
  pros            TEXT,
  cons            TEXT,
  image_urls      TEXT[] DEFAULT '{}',
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved     BOOLEAN DEFAULT false,
  helpful_count   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- ============================================================
-- WISHLIST TABLE
-- ============================================================
CREATE TABLE public.wishlists (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- ============================================================
-- COUPONS TABLE
-- ============================================================
CREATE TABLE public.coupons (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code                TEXT NOT NULL UNIQUE,
  description         TEXT,
  type                TEXT NOT NULL CHECK (type IN ('percentage', 'fixed', 'free_shipping')),
  value               NUMERIC(10,2) NOT NULL,
  min_order_amount    NUMERIC(10,2) DEFAULT 0,
  max_discount_amount NUMERIC(10,2),
  usage_limit         INTEGER,
  usage_count         INTEGER DEFAULT 0,
  user_limit          INTEGER DEFAULT 1,
  applies_to          TEXT DEFAULT 'all' CHECK (applies_to IN ('all', 'products', 'categories', 'brands')),
  applies_to_ids      UUID[] DEFAULT '{}',
  is_active           BOOLEAN DEFAULT true,
  starts_at           TIMESTAMPTZ,
  expires_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ORDERS TABLE
-- ============================================================
CREATE TABLE public.orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        TEXT NOT NULL UNIQUE,
  user_id             UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  guest_email         TEXT,
  
  -- Status
  status              TEXT NOT NULL DEFAULT 'pending' 
                      CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),
  payment_status      TEXT NOT NULL DEFAULT 'pending' 
                      CHECK (payment_status IN ('pending','authorized','captured','failed','refunded')),
  
  -- Amounts
  subtotal            NUMERIC(10,2) NOT NULL,
  discount_amount     NUMERIC(10,2) DEFAULT 0,
  shipping_amount     NUMERIC(10,2) DEFAULT 0,
  tax_amount          NUMERIC(10,2) DEFAULT 0,
  total_amount        NUMERIC(10,2) NOT NULL,
  
  -- Coupon
  coupon_id           UUID REFERENCES public.coupons(id),
  coupon_code         TEXT,
  
  -- Addresses (snapshot at time of order)
  shipping_address    JSONB NOT NULL,
  billing_address     JSONB,
  
  -- Payment
  payment_method      TEXT,
  payment_provider    TEXT,
  payment_intent_id   TEXT,
  stripe_session_id   TEXT,
  
  -- Shipping
  shipping_method     TEXT,
  tracking_number     TEXT,
  tracking_url        TEXT,
  shipped_at          TIMESTAMPTZ,
  delivered_at        TIMESTAMPTZ,
  estimated_delivery  DATE,
  
  -- Notes
  customer_notes      TEXT,
  admin_notes         TEXT,
  
  -- Timestamps
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- Generate readable order number via sequence
CREATE SEQUENCE order_number_seq START 10000;
ALTER TABLE public.orders ALTER COLUMN order_number 
  SET DEFAULT 'VT-' || nextval('order_number_seq');

-- ============================================================
-- ORDER ITEMS TABLE
-- ============================================================
CREATE TABLE public.order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  variant_id      UUID REFERENCES public.product_variants(id),
  
  -- Snapshot at purchase time
  product_name    TEXT NOT NULL,
  product_slug    TEXT NOT NULL,
  product_image   TEXT,
  variant_name    TEXT,
  sku             TEXT,
  
  quantity        INTEGER NOT NULL DEFAULT 1,
  unit_price      NUMERIC(10,2) NOT NULL,
  total_price     NUMERIC(10,2) NOT NULL,
  
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- BLOG POSTS TABLE
-- ============================================================
CREATE TABLE public.blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  excerpt         TEXT,
  content         TEXT NOT NULL,
  cover_image_url TEXT,
  category        TEXT,
  tags            TEXT[] DEFAULT '{}',
  is_published    BOOLEAN DEFAULT false,
  is_featured     BOOLEAN DEFAULT false,
  view_count      INTEGER DEFAULT 0,
  read_time_min   INTEGER,
  meta_title      TEXT,
  meta_description TEXT,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================
CREATE TABLE public.newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT,
  is_active   BOOLEAN DEFAULT true,
  source      TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

-- ============================================================
-- CONTACT MESSAGES TABLE
-- ============================================================
CREATE TABLE public.contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT false,
  replied_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ANALYTICS EVENTS TABLE (lightweight)
-- ============================================================
CREATE TABLE public.analytics_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name  TEXT NOT NULL,
  user_id     UUID REFERENCES public.profiles(id),
  session_id  TEXT,
  properties  JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now()
);
