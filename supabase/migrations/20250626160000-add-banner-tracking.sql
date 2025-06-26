
-- Add tracking columns to banners table
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
