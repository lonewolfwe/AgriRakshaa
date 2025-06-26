
-- Create the blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  slug TEXT UNIQUE NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create the tutorials table
CREATE TABLE public.tutorials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_minutes INTEGER,
  featured_image_url TEXT,
  video_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create the shop_items table
CREATE TABLE public.shop_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read published blog posts
CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (is_published = true);

-- Allow admin to manage all blog posts
CREATE POLICY "Admin can manage blog posts" 
  ON public.blog_posts 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'kaustubhd239@gmail.com'
  ));

-- Add Row Level Security (RLS) for tutorials
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read published tutorials
CREATE POLICY "Anyone can view published tutorials" 
  ON public.tutorials 
  FOR SELECT 
  USING (is_published = true);

-- Allow admin to manage all tutorials
CREATE POLICY "Admin can manage tutorials" 
  ON public.tutorials 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'kaustubhd239@gmail.com'
  ));

-- Add Row Level Security (RLS) for shop_items
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read available shop items
CREATE POLICY "Anyone can view available shop items" 
  ON public.shop_items 
  FOR SELECT 
  USING (is_available = true);

-- Allow admin to manage all shop items
CREATE POLICY "Admin can manage shop items" 
  ON public.shop_items 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'kaustubhd239@gmail.com'
  ));

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_published ON public.blog_posts (is_published);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX idx_tutorials_published ON public.tutorials (is_published);
CREATE INDEX idx_tutorials_difficulty ON public.tutorials (difficulty_level);
CREATE INDEX idx_shop_items_available ON public.shop_items (is_available);
CREATE INDEX idx_shop_items_category ON public.shop_items (category);
