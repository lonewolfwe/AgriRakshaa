
import { supabase } from "@/integrations/supabase/client";

export interface TrackingData {
  actionType: string;
  actionData?: any;
  sessionId?: string;
  district?: string;
  cropType?: string;
}

export interface FeedbackData {
  rating: number;
  comment?: string;
  feedbackType: string;
  relatedAnalysisId?: string;
}

export interface ProductRecommendationData {
  analysisId: string;
  productName: string;
  productType: 'organic' | 'chemical';
  isCompetitor?: boolean;
  diseaseDetected?: string;
  cropType?: string;
}

class TrackingService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async initializeSession() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('user_sessions').insert({
        user_id: user.id,
        session_id: this.sessionId,
        start_time: new Date().toISOString(),
        pages_visited: 1,
        actions_performed: 0
      });
    }
  }

  async trackAction(data: TrackingData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      await supabase.from('farmer_actions').insert({
        user_id: user.id,
        action_type: data.actionType,
        action_data: data.actionData,
        session_id: data.sessionId || this.sessionId,
        district: data.district,
        crop_type: data.cropType
      });

      // Update session action count
      await this.updateSessionActions();
    } catch (error) {
      console.error('Error tracking action:', error);
    }
  }

  async submitFeedback(data: FeedbackData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      return await supabase.from('feedback').insert({
        user_id: user.id,
        rating: data.rating,
        comment: data.comment,
        feedback_type: data.feedbackType,
        related_analysis_id: data.relatedAnalysisId
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }

  async trackProductRecommendation(data: ProductRecommendationData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      await supabase.from('product_recommendations').insert({
        user_id: user.id,
        analysis_id: data.analysisId,
        product_name: data.productName,
        product_type: data.productType,
        is_competitor: data.isCompetitor || false,
        disease_detected: data.diseaseDetected,
        crop_type: data.cropType
      });
    } catch (error) {
      console.error('Error tracking product recommendation:', error);
    }
  }

  private async updateSessionActions() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // Get current session data
      const { data: session } = await supabase
        .from('user_sessions')
        .select('actions_performed')
        .eq('session_id', this.sessionId)
        .eq('user_id', user.id)
        .single();

      if (session) {
        // Update with incremented count
        await supabase
          .from('user_sessions')
          .update({ 
            actions_performed: (session.actions_performed || 0) + 1
          })
          .eq('session_id', this.sessionId)
          .eq('user_id', user.id);
      }
    } catch (error) {
      console.error('Error updating session actions:', error);
    }
  }

  async endSession() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const endTime = new Date();
    const { data: session } = await supabase
      .from('user_sessions')
      .select('start_time')
      .eq('session_id', this.sessionId)
      .eq('user_id', user.id)
      .single();

    if (session) {
      const startTime = new Date(session.start_time);
      const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

      await supabase
        .from('user_sessions')
        .update({
          end_time: endTime.toISOString(),
          duration_seconds: durationSeconds
        })
        .eq('session_id', this.sessionId)
        .eq('user_id', user.id);
    }
  }
}

export const trackingService = new TrackingService();
