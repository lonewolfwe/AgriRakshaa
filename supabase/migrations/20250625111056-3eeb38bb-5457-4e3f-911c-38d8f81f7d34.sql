
-- Create table for tracking farmer actions
CREATE TABLE public.farmer_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL, -- 'image_upload', 'analysis_complete', 'language_change', 'treatment_view', etc.
  action_data JSONB, -- Store additional data like crop type, disease detected, etc.
  session_id TEXT, -- To track user sessions
  district TEXT,
  crop_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for feedback
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  feedback_type TEXT NOT NULL, -- 'general', 'diagnosis', 'treatment', 'app_experience'
  related_analysis_id TEXT, -- Reference to specific analysis if applicable
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for product recommendations tracking
CREATE TABLE public.product_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  analysis_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL, -- 'organic', 'chemical'
  is_competitor BOOLEAN DEFAULT false,
  disease_detected TEXT,
  crop_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user sessions to track engagement
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  pages_visited INTEGER DEFAULT 0,
  actions_performed INTEGER DEFAULT 0
);

-- Create indexes for better query performance
CREATE INDEX idx_farmer_actions_user_id ON public.farmer_actions(user_id);
CREATE INDEX idx_farmer_actions_created_at ON public.farmer_actions(created_at);
CREATE INDEX idx_farmer_actions_action_type ON public.farmer_actions(action_type);
CREATE INDEX idx_farmer_actions_district ON public.farmer_actions(district);
CREATE INDEX idx_farmer_actions_crop_type ON public.farmer_actions(crop_type);

CREATE INDEX idx_feedback_user_id ON public.feedback(user_id);
CREATE INDEX idx_feedback_created_at ON public.feedback(created_at);
CREATE INDEX idx_feedback_rating ON public.feedback(rating);

CREATE INDEX idx_product_recommendations_user_id ON public.product_recommendations(user_id);
CREATE INDEX idx_product_recommendations_created_at ON public.product_recommendations(created_at);
CREATE INDEX idx_product_recommendations_disease ON public.product_recommendations(disease_detected);

CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_start_time ON public.user_sessions(start_time);

-- Enable Row Level Security
ALTER TABLE public.farmer_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for farmer_actions
CREATE POLICY "Users can view their own actions" 
  ON public.farmer_actions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own actions" 
  ON public.farmer_actions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for feedback
CREATE POLICY "Users can view their own feedback" 
  ON public.feedback 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback" 
  ON public.feedback 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own feedback" 
  ON public.feedback 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for product_recommendations
CREATE POLICY "Users can view their own recommendations" 
  ON public.product_recommendations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recommendations" 
  ON public.product_recommendations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_sessions
CREATE POLICY "Users can view their own sessions" 
  ON public.user_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" 
  ON public.user_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
  ON public.user_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create admin policies (assuming admin role exists)
CREATE POLICY "Admins can view all farmer actions" 
  ON public.farmer_actions 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (full_name ILIKE '%admin%' OR email ILIKE '%admin%')
    )
  );

CREATE POLICY "Admins can view all feedback" 
  ON public.feedback 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (full_name ILIKE '%admin%' OR email ILIKE '%admin%')
    )
  );

CREATE POLICY "Admins can view all recommendations" 
  ON public.product_recommendations 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (full_name ILIKE '%admin%' OR email ILIKE '%admin%')
    )
  );

CREATE POLICY "Admins can view all sessions" 
  ON public.user_sessions 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (full_name ILIKE '%admin%' OR email ILIKE '%admin%')
    )
  );
