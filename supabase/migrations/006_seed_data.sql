-- ============================================================
-- FILE: supabase/migrations/006_seed_data.sql
-- ============================================================

-- Seed Brands
INSERT INTO public.brands (id, name, slug, logo_url, banner_url, description, country, website_url, is_featured, sort_order) VALUES
('b1111111-1111-1111-1111-111111111111', 'Apex Mobility', 'apex-mobility', '/images/brands/apex.svg', '/images/brands/apex-banner.jpg', 'Rugged, high-end mountain e-bikes built for alpine trails and backcountry exploring.', 'USA', 'https://apexmobility.com', true, 1),
('b2222222-2222-2222-2222-222222222222', 'Nomad E-Bikes', 'nomad-e-bikes', '/images/brands/nomad.svg', '/images/brands/nomad-banner.jpg', 'Versatile touring and cargo e-bikes designed for long-distance self-supported adventure.', 'Germany', 'https://nomadebikes.de', true, 2),
('b3333333-3333-3333-3333-333333333333', 'UrbanFlow', 'urbanflow', '/images/brands/urbanflow.svg', '/images/brands/urbanflow-banner.jpg', 'Ultra-sleek, lightweight urban commuter e-bikes with integrated smart technologies.', 'Netherlands', 'https://urbanflow.nl', true, 3),
('b4444444-4444-4444-4444-444444444444', 'TerraTrail', 'terratrail', '/images/brands/terratrail.svg', '/images/brands/terratrail-banner.jpg', 'Robust all-road and gravel hybrid electric bikes bridging the gap between city streets and gravel paths.', 'Canada', 'https://terratrail.ca', false, 4);

-- Seed Categories
INSERT INTO public.categories (id, parent_id, name, slug, description, image_url, icon_name, is_active, sort_order) VALUES
('c1111111-1111-1111-1111-111111111111', NULL, 'E-Bikes', 'e-bikes', 'Premium electric bicycles for adventure, commuting, and off-road riding.', '/images/categories/e-bikes.jpg', 'Bike', true, 1),
('c2222222-2222-2222-2222-222222222222', NULL, 'Accessories', 'accessories', 'High-quality components, apparel, and utility gear for your ride.', '/images/categories/accessories.jpg', 'Wrench', true, 2);

INSERT INTO public.categories (id, parent_id, name, slug, description, image_url, icon_name, is_active, sort_order) VALUES
('c1111111-1111-1111-1111-111111111112', 'c1111111-1111-1111-1111-111111111111', 'Adventure E-Bikes', 'adventure-e-bikes', 'Rugged, dual-sport and utility e-bikes for trail and exploration.', '/images/categories/adventure.jpg', 'Compass', true, 1),
('c1111111-1111-1111-1111-111111111113', 'c1111111-1111-1111-1111-111111111111', 'Urban Commuter E-Bikes', 'urban-commuter-e-bikes', 'Fast, lightweight, and stylish electric bikes for city commuting.', '/images/categories/urban.jpg', 'Building', true, 2),
('c1111111-1111-1111-1111-111111111114', 'c1111111-1111-1111-1111-111111111111', 'Mountain E-Bikes', 'mountain-e-bikes', 'Full-suspension and hardtail electric mountain bikes for tackling steep ascents and rugged descents.', '/images/categories/mountain.jpg', 'Mountain', true, 3),
('c2222222-2222-2222-2222-222222222223', 'c2222222-2222-2222-2222-222222222222', 'Safety & Gear', 'safety-gear', 'Helmets, lights, and locks to keep you safe.', '/images/categories/safety.jpg', 'Shield', true, 1),
('c2222222-2222-2222-2222-222222222224', 'c2222222-2222-2222-2222-222222222222', 'Bags & Racks', 'bags-racks', 'Waterproof panniers, frame packs, and heavy-duty racks.', '/images/categories/bags.jpg', 'ShoppingBag', true, 2);

-- Seed Products (E-Bikes)
INSERT INTO public.products (
  id, brand_id, category_id, name, slug, tagline, description, short_description, price, compare_price, cost_price, sku, barcode,
  weight_kg, color, frame_material, motor_power_w, battery_voltage_v, battery_capacity_wh, max_range_km, max_speed_kmh, charge_time_hours,
  motor_type, assist_levels, display_type, brake_type, suspension, wheel_size_in, gear_count, frame_sizes, ip_rating,
  thumbnail_url, image_urls, video_url, is_active, is_featured, is_best_seller, is_new_arrival, stock_quantity, low_stock_threshold,
  track_inventory, warranty_years, warranty_notes, meta_title, meta_description, tags, avg_rating, review_count, published_at
) VALUES
(
  'p1111111-1111-1111-1111-111111111111',
  'b1111111-1111-1111-1111-111111111111',
  'c1111111-1111-1111-1111-111111111114',
  'Apex Peak-9',
  'apex-peak-9',
  'Summit Any Peak. Conquer Any Trail.',
  'The Apex Peak-9 represents the pinnacle of electric mountain biking engineering. Built with a full-carbon fiber frame and powered by a high-torque 750W mid-drive motor, it handles vertical climbs effortlessly. Featuring an advanced dual-suspension layout with 160mm travel, this e-bike smoothens the roughest rock gardens and roots. The integrated 720Wh battery ensures you can tackle multiple peaks on a single charge.',
  'Full-suspension carbon fiber electric mountain bike with 750W motor and 720Wh battery.',
  4999.00, 5499.00, 2800.00, 'AP-PEAK9-001', '810023456011',
  23.50, 'Forest Green', 'Carbon Fiber', 750, 48.0, 720.0, 110.0, 45.0, 4.5,
  'Mid-Drive Torque-Sensing', 5, '3.2-inch TFT Color Smart Display', 'Hydraulic Quad-Piston Disc', 'Full Suspension (RockShox Lyric/Super Deluxe, 160mm travel)', 29.0, 12,
  '{"S", "M", "L"}', 'IP66',
  '/images/products/peak-9-thumb.jpg',
  '{"/images/products/peak-9-1.jpg", "/images/products/peak-9-2.jpg", "/images/products/peak-9-3.jpg"}',
  '/videos/products/peak-9-demo.mp4',
  true, true, true, false, 15, 3,
  true, 3, 'Covers motor, battery, and frame defects under normal riding conditions.',
  'Apex Peak-9 Premium Full-Suspension E-MTB | VoltTrail',
  'Discover the Apex Peak-9 full suspension carbon e-MTB with 750W mid-drive motor and 720Wh battery. Conquer rugged trails and vertical climbs today.',
  '{"emtb", "mountain", "full-suspension", "carbon", "apex"}',
  4.8, 1, now()
),
(
  'p1111111-1111-1111-1111-111111111112',
  'b3333333-3333-3333-3333-333333333333',
  'c1111111-1111-1111-1111-111111111113',
  'UrbanFlow Carbon S',
  'urbanflow-carbon-s',
  'Sleek. Light. Effortless City Transit.',
  'Designed for the modern urbanite, the UrbanFlow Carbon S weighs in at a remarkable 15.5 kg, making it one of the lightest commuter e-bikes in its class. Featuring an integrated carbon handlebar, invisible internal cable routing, and a clean gates carbon belt drive, it offers near-silent operation and zero maintenance. The rear hub motor delivers a smooth 250W boost that works in perfect harmony with your natural pedaling cadence.',
  'Ultra-light carbon city commuter e-bike with Gates Belt Drive and integrated GPS tracking.',
  2899.00, NULL, 1500.00, 'UF-CARBS-001', '810023456028',
  15.50, 'Slate Gray', 'Carbon Fiber', 250, 36.0, 360.0, 80.0, 25.0, 2.5,
  'Rear Hub Torque-Sensing', 3, 'Minimalist LED Stem Display', 'Hydraulic Dual-Piston Disc', 'Rigid Carbon Fiber', 28.0, 1,
  '{"M", "L"}', 'IP65',
  '/images/products/carbon-s-thumb.jpg',
  '{"/images/products/carbon-s-1.jpg", "/images/products/carbon-s-2.jpg"}',
  NULL,
  true, true, false, true, 8, 2,
  true, 2, '2-year warranty on electronic system; lifetime on frame.',
  'UrbanFlow Carbon S Sleek City Commuter | VoltTrail',
  'Buy the lightweight UrbanFlow Carbon S urban e-bike. Features Gates Belt Drive, integrated lights, smart GPS antitheft tracking, and 80km range.',
  '{"commuter", "urban", "belt-drive", "lightweight", "urbanflow"}',
  5.0, 1, now()
),
(
  'p1111111-1111-1111-1111-111111111113',
  'b2222222-2222-2222-2222-222222222222',
  'c1111111-1111-1111-1111-111111111112',
  'Nomad Ranger Cargo',
  'nomad-ranger-cargo',
  'Load Up. Go Beyond.',
  'The Nomad Ranger Cargo is built for the long haul. With an extra-sturdy aluminum utility frame, heavy-duty rear cargo rack, and dual-battery capability, this bike carries up to 180kg of payload. The high-performance 500W cargo-optimized mid-drive motor provides stable climbing power even when fully loaded. Ideal for long touring adventures or hauling groceries and children around town.',
  'Heavy-duty electric cargo utility bike with 500W motor, modular rack system, and optional dual battery.',
  3599.00, 3899.00, 2100.00, 'NM-RNG-CARG', '810023456035',
  31.00, 'Safari Sand', '6061 Aluminum Alloy', 500, 48.0, 672.0, 130.0, 32.0, 5.0,
  'Mid-Drive Speed-Sensing', 5, 'LCD Backlit Display', 'Hydraulic Quad-Piston Disc', 'Front Suspension Fork (80mm travel)', 27.5, 9,
  '{"M"}', 'IPX5',
  '/images/products/ranger-thumb.jpg',
  '{"/images/products/ranger-1.jpg", "/images/products/ranger-2.jpg"}',
  NULL,
  true, false, true, false, 12, 2,
  true, 2, 'Standard 2-year comprehensive warranty.',
  'Nomad Ranger Cargo Heavy-Duty Utility E-Bike | VoltTrail',
  'Carry more with the Nomad Ranger Cargo e-bike. Dual-battery options, 180kg payload limit, stable 500W motor, and comfortable front suspension.',
  '{"cargo", "utility", "adventure", "nomad", "touring"}',
  4.0, 1, now()
);

-- Seed Product Variants
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_price, stock_quantity, color, size, frame_size, image_url, is_active, sort_order) VALUES
('v1111111-1111-1111-1111-111111111111', 'p1111111-1111-1111-1111-111111111111', 'Apex Peak-9 - S / Forest Green', 'AP-PEAK9-S-FG', 4999.00, 5499.00, 4, 'Forest Green', 'S', 'S', '/images/products/peak-9-1.jpg', true, 1),
('v1111111-1111-1111-1111-111111111112', 'p1111111-1111-1111-1111-111111111111', 'Apex Peak-9 - M / Forest Green', 'AP-PEAK9-M-FG', 4999.00, 5499.00, 6, 'Forest Green', 'M', 'M', '/images/products/peak-9-1.jpg', true, 2),
('v1111111-1111-1111-1111-111111111113', 'p1111111-1111-1111-1111-111111111111', 'Apex Peak-9 - L / Forest Green', 'AP-PEAK9-L-FG', 4999.00, 5499.00, 5, 'Forest Green', 'L', 'L', '/images/products/peak-9-1.jpg', true, 3),
('v1111111-1111-1111-1111-111111111114', 'p1111111-1111-1111-1111-111111111112', 'UrbanFlow Carbon S - M / Slate Gray', 'UF-CARBS-M-SG', 2899.00, NULL, 5, 'Slate Gray', 'M', 'M', '/images/products/carbon-s-1.jpg', true, 1),
('v1111111-1111-1111-1111-111111111115', 'p1111111-1111-1111-1111-111111111112', 'UrbanFlow Carbon S - L / Slate Gray', 'UF-CARBS-L-SG', 2899.00, NULL, 3, 'Slate Gray', 'L', 'L', '/images/products/carbon-s-1.jpg', true, 2),
('v1111111-1111-1111-1111-111111111116', 'p1111111-1111-1111-1111-111111111113', 'Nomad Ranger - One Size / Safari Sand', 'NM-RNG-M-SS', 3599.00, 3899.00, 12, 'Safari Sand', 'M', 'M', '/images/products/ranger-1.jpg', true, 1);

-- Seed Specs
INSERT INTO public.product_specs (product_id, spec_group, spec_key, spec_value, sort_order) VALUES
('p1111111-1111-1111-1111-111111111111', 'Electronics', 'Motor', '750W Mid-drive Bafang M620 Torque sensor', 1),
('p1111111-1111-1111-1111-111111111111', 'Electronics', 'Battery', '48V 15Ah (720Wh) Samsung Li-ion Cells', 2),
('p1111111-1111-1111-1111-111111111111', 'Components', 'Fork', 'RockShox Lyric Select RC, 160mm travel', 3),
('p1111111-1111-1111-1111-111111111111', 'Components', 'Rear Shock', 'RockShox Super Deluxe Select+', 4),
('p1111111-1111-1111-1111-111111111111', 'Components', 'Drivetrain', 'SRAM GX Eagle 12-Speed', 5),
('p1111111-1111-1111-1111-111111111112', 'Electronics', 'Motor', '250W Rear Hub customized Mivice M070', 1),
('p1111111-1111-1111-1111-111111111112', 'Electronics', 'Battery', '36V 10Ah (360Wh) fully integrated LG Cells', 2),
('p1111111-1111-1111-1111-111111111112', 'Components', 'Drivetrain', 'Gates Carbon CDX Belt Drive Single Speed', 3),
('p1111111-1111-1111-1111-111111111112', 'Components', 'Brakes', 'Tektro HD-R280 Hydraulic Disc', 4),
('p1111111-1111-1111-1111-111111111113', 'Electronics', 'Motor', '500W Mid-drive Ananda Cargo Specific', 1),
('p1111111-1111-1111-1111-111111111113', 'Electronics', 'Battery', '48V 14Ah (672Wh) dual battery ready', 2),
('p1111111-1111-1111-1111-111111111113', 'Components', 'Payload Capacity', '180kg / 400lbs total payload', 3);

-- Seed Profiles for dummy reviews (Note: must be created first if they reference auth.users, but since this SQL runs on Supabase and uses UUIDs, let's create a seed profile representing a guest or a custom auth user).
-- Since auth.users is managed by Netlify/GoTrue, we can write direct profiles. For seeding profiles that link to auth.users, we can insert dummy users into auth.users first, or insert into profiles directly bypassing the foreign key in case RLS or tests require it.
-- Wait, in auth.users, inserting is tricky due to schemas. Let's create profiles that do not strictly check foreign keys if they are not constrained, but the profiles table DOES have:
-- id UUID REFERENCES auth.users(id) ON DELETE CASCADE
-- So we cannot insert directly unless there's a record in auth.users.
-- Wait, is there a bypass? We can insert a seed user in auth.users first!
-- Let's check how to seed auth.users in PostgreSQL:
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES
('u1111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'john@volttrail.com', '$2a$10$vI8qFqgG1s8v9V5K/yP30.W929.Q.V7C/mF3QYc9UuV4o7W9j8zSy', now(), NULL, '', NULL, '', NULL, '', '', NULL, now(), '{"provider":"email","providers":["email"]}', '{"full_name":"John Doe"}', false, now(), now(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
('u2222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'alice@volttrail.com', '$2a$10$vI8qFqgG1s8v9V5K/yP30.W929.Q.V7C/mF3QYc9UuV4o7W9j8zSy', now(), NULL, '', NULL, '', NULL, '', '', NULL, now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Alice Smith"}', false, now(), now(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
('u3333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'admin@volttrail.com', '$2a$10$vI8qFqgG1s8v9V5K/yP30.W929.Q.V7C/mF3QYc9UuV4o7W9j8zSy', now(), NULL, '', NULL, '', NULL, '', '', NULL, now(), '{"provider":"email","providers":["email"]}', '{"full_name":"VoltTrail Admin"}', true, now(), now(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL)
ON CONFLICT (id) DO NOTHING;

-- Let's update roles in public.profiles (since trigger will create public.profiles records automatically, let's verify if they exist, or update/insert them directly)
-- Wait, the trigger 'on_auth_user_created' will automatically run on auth.users inserts and insert records into public.profiles!
-- Let's make sure that profiles exist and then update roles:
UPDATE public.profiles SET role = 'admin' WHERE id = 'u3333333-3333-3333-3333-333333333333';

-- Seed Reviews
INSERT INTO public.reviews (id, product_id, user_id, rating, title, body, pros, cons, is_verified_purchase, is_approved, helpful_count, created_at) VALUES
('r1111111-1111-1111-1111-111111111111', 'p1111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', 5, 'Unbelievable power and range!', 'I took the Apex Peak-9 on a 40-mile mountain trail ride with some massive vertical climbs. The motor was incredibly responsive, and I still had 30% battery left at the end! Highly recommend.', 'Excellent power, solid suspension, premium build.', 'Quite heavy to lift onto my car rack.', true, true, 8, now()),
('r2222222-2222-2222-2222-222222222222', 'p1111111-1111-1111-1111-111111111112', 'u2222222-2222-2222-2222-222222222222', 5, 'The perfect city bike', 'So clean, so quiet. This is exactly what I wanted for my daily commute. The carbon belt drive requires no grease and doesn''t stain my trousers. The integrated lights are beautiful.', 'Sleek design, light weight, zero maintenance belt drive.', 'None so far, worth every penny.', true, true, 4, now()),
('r3333333-3333-3333-3333-333333333333', 'p1111111-1111-1111-1111-111111111113', 'u1111111-1111-1111-1111-111111111111', 4, 'Great utility bike, minor details', 'This is a tank! It hauls groceries and my two kids without breaking a sweat. My only complaint is that the speed sensor is slightly delayed compared to high-end torque sensors.', 'Solid frame, huge carrying capacity, good battery life.', 'Speed sensor delay, quite bulky.', true, true, 3, now())
ON CONFLICT (id) DO NOTHING;

-- Seed Blog Posts
INSERT INTO public.blog_posts (id, author_id, title, slug, excerpt, content, cover_image_url, category, tags, is_published, is_featured, read_time_min, published_at) VALUES
('b1111111-1111-1111-1111-11111111111a', 'u3333333-3333-3333-3333-333333333333', 'Choosing the Right E-Bike: Hub Motor vs. Mid-Drive', 'hub-vs-mid-drive-ebikes', 'Understanding the key differences between rear hub motors and mid-drive motors to select the perfect ride for your needs.', 'Electric bike motors come in two main layouts: hub motors, which reside in the wheel itself, and mid-drive motors, which are positioned in the middle of the frame around the bottom bracket. Each has distinct advantages. Mid-drive motors are excellent for climbing steep trails because they leverage the bike''s mechanical gear system, keeping the motor in its optimal RPM range. Hub motors are simpler, require virtually no chain wear, and are excellent for flat city commutes. For terrain with steep hills or off-road conditions, mid-drive is superior. For urban asphalt, hub drives are robust and cost-effective.', '/images/blog/motor-guide.jpg', 'Guides', '{"motors", "tech", "buying-guide"}', true, true, 6, now()),
('b2222222-2222-2222-2222-22222222222b', 'u3333333-3333-3333-3333-333333333333', 'E-Bike Battery Care: 5 Tips to Double Your Battery Lifespan', 'ebike-battery-care-tips', 'Maximize your battery health, speed up charging, and retain maximum range over years of rugged riding.', 'The lithium-ion battery on your e-bike is its most valuable component. To keep it healthy: 1) Avoid keeping it fully charged at 100% or fully empty at 0% for long storage periods; 40-60% charge is the sweet spot. 2) Store the battery in cool room temperatures. Extremely hot or freezing temperatures degrade cell health. 3) Don''t charge your battery immediately after a long ride; let it cool down first. 4) Use the original manufacturer charger. 5) Keep your firmware updated to optimize charging algorithms.', '/images/blog/battery-care.jpg', 'Maintenance', '{"battery", "maintenance", "tips"}', true, false, 4, now())
ON CONFLICT (id) DO NOTHING;

-- Seed Coupons
INSERT INTO public.coupons (id, code, description, type, value, min_order_amount, max_discount_amount, usage_limit, usage_count, user_limit, applies_to, applies_to_ids, is_active, starts_at, expires_at) VALUES
('c0000000-0000-0000-0000-000000000001', 'WELCOME10', 'Get 10% off your first purchase', 'percentage', 10.00, 0.00, 500.00, 1000, 0, 1, 'all', '{}', true, now(), now() + interval '1 year'),
('c0000000-0000-0000-0000-000000000002', 'RIDEWILD100', 'Get $100 off any premium e-bike', 'fixed', 100.00, 1000.00, 100.00, 500, 0, 1, 'categories', '{"c1111111-1111-1111-1111-111111111111"}', true, now(), now() + interval '6 months');
