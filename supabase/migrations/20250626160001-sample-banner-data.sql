
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
);
