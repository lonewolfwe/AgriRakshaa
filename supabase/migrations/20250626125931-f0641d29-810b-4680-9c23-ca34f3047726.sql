
-- Add tracking columns to banners table if they don't exist
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS impressions INTEGER DEFAULT 0;
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS clicks INTEGER DEFAULT 0;
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS sponsor_name TEXT;
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS pricing_model TEXT CHECK (pricing_model IN ('performance', 'fixed_monthly')) DEFAULT 'performance';
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS monthly_fee DECIMAL(10,2);
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS cost_per_click DECIMAL(10,2);
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS cost_per_impression DECIMAL(10,2);

-- Create banner_analytics table for detailed tracking
CREATE TABLE IF NOT EXISTS public.banner_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  banner_id UUID REFERENCES public.banners(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click')),
  user_id UUID,
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_banner_analytics_banner_id ON public.banner_analytics (banner_id);
CREATE INDEX IF NOT EXISTS idx_banner_analytics_event_type ON public.banner_analytics (event_type);
CREATE INDEX IF NOT EXISTS idx_banner_analytics_created_at ON public.banner_analytics (created_at);

-- Add Row Level Security for banner analytics
ALTER TABLE public.banner_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy that allows reading analytics for everyone (for public display)
CREATE POLICY "Anyone can create banner analytics" 
  ON public.banner_analytics 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows admin to view all analytics
CREATE POLICY "Admin can view all banner analytics" 
  ON public.banner_analytics 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'kaustubhd239@gmail.com'
  ));

-- Insert sample sponsored banners
INSERT INTO public.banners (
  title, 
  description, 
  image_url, 
  link_url, 
  page_location, 
  sponsor_name,
  pricing_model,
  monthly_fee,
  cost_per_click,
  cost_per_impression,
  is_active,
  order_position
) VALUES 
(
  'Sponsored by XYZ Fertilizer',
  'Premium organic fertilizer for better crop yield - Get 20% off today!',
  'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=400&fit=crop',
  'https://example.com/xyz-fertilizer',
  'homepage',
  'XYZ Fertilizer Company',
  'fixed_monthly',
  500.00,
  0,
  0,
  true,
  1
),
(
  'Use ABC Pesticide for this disease – Buy Now',
  'Effective treatment against crop diseases with 99% success rate',
  'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&h=400&fit=crop',
  'https://example.com/abc-pesticide',
  'results',
  'ABC Pesticide Solutions',
  'performance',
  0,
  2.50,
  0.10,
  true,
  1
),
(
  'Boost Your Harvest with Premium Seeds',
  'High-yield disease-resistant seeds - Order now for next season',
  'https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800&h=400&fit=crop',
  'https://example.com/premium-seeds',
  'homepage',
  'Premium Seeds Ltd',
  'performance',
  0,
  1.75,
  0.05,
  true,
  2
)
ON CONFLICT (id) DO NOTHING;

-- Add demo shop items
INSERT INTO public.shop_items (
  name,
  description,
  price,
  category,
  image_url,
  stock_quantity,
  is_available
) VALUES 
(
  'Organic Fertilizer - 50kg',
  'Premium organic fertilizer for all crop types. Improves soil fertility and crop yield.',
  45.99,
  'fertilizers',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
  100,
  true
),
(
  'Disease Resistant Seeds - Tomato',
  'High-yield tomato seeds with natural disease resistance. Perfect for organic farming.',
  12.99,
  'seeds',
  'https://images.unsplash.com/photo-1592841200221-76ac923bd279?w=400&h=400&fit=crop',
  50,
  true
),
(
  'Bio Pesticide Spray - 1L',
  'Eco-friendly pesticide spray effective against common crop pests. Safe for organic crops.',
  28.50,
  'pesticides',
  'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&h=400&fit=crop',
  75,
  true
),
(
  'Smart Irrigation Timer',
  'Automated irrigation system controller. Save water and improve crop growth efficiency.',
  89.99,
  'tools',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
  25,
  true
),
(
  'Soil pH Test Kit',
  'Professional soil testing kit to monitor pH levels and nutrient content.',
  19.99,
  'tools',
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop',
  40,
  true
),
(
  'Premium Compost - 25kg',
  'Rich organic compost made from natural materials. Perfect soil conditioner.',
  22.99,
  'fertilizers',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
  80,
  true
)
ON CONFLICT (id) DO NOTHING;

-- Create shop analytics table for tracking product views and clicks
CREATE TABLE IF NOT EXISTS public.shop_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.shop_items(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click')),
  user_id UUID,
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for shop analytics
CREATE INDEX IF NOT EXISTS idx_shop_analytics_product_id ON public.shop_analytics (product_id);
CREATE INDEX IF NOT EXISTS idx_shop_analytics_event_type ON public.shop_analytics (event_type);
CREATE INDEX IF NOT EXISTS idx_shop_analytics_created_at ON public.shop_analytics (created_at);

-- Add RLS for shop analytics
ALTER TABLE public.shop_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create shop analytics" 
  ON public.shop_analytics 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin can view all shop analytics" 
  ON public.shop_analytics 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'kaustubhd239@gmail.com'
  ));
