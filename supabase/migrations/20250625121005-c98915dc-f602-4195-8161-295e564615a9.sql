
-- Create the banners table for carousel banner management
CREATE TABLE public.banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  page_location TEXT NOT NULL CHECK (page_location IN ('homepage', 'results')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  order_position INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create the farmers table for farmer management  
CREATE TABLE public.farmers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  district TEXT,
  state TEXT,
  village TEXT,
  crop_type TEXT,
  last_activity TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked'))
);

-- Add Row Level Security (RLS) for banners - only admins can manage
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Create policy that allows reading banners for everyone (public display)
CREATE POLICY "Anyone can view active banners" 
  ON public.banners 
  FOR SELECT 
  USING (is_active = true);

-- Create policy that allows full access for admin users
CREATE POLICY "Admin can manage banners" 
  ON public.banners 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'kaustubhd239@gmail.com'
  ));

-- Add Row Level Security (RLS) for farmers - only admins can manage
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;

-- Create policy that allows admin to manage farmers
CREATE POLICY "Admin can manage farmers" 
  ON public.farmers 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'kaustubhd239@gmail.com'
  ));

-- Create indexes for better performance
CREATE INDEX idx_banners_page_location ON public.banners (page_location);
CREATE INDEX idx_banners_order_position ON public.banners (order_position);
CREATE INDEX idx_banners_active ON public.banners (is_active);
CREATE INDEX idx_farmers_email ON public.farmers (email);
CREATE INDEX idx_farmers_status ON public.farmers (status);
