export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      banner_analytics: {
        Row: {
          banner_id: string | null
          created_at: string
          event_type: string
          id: string
          ip_address: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          banner_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          banner_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "banner_analytics_banner_id_fkey"
            columns: ["banner_id"]
            isOneToOne: false
            referencedRelation: "banners"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          clicks: number | null
          cost_per_click: number | null
          cost_per_impression: number | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          image_url: string
          impressions: number | null
          is_active: boolean
          link_url: string | null
          monthly_fee: number | null
          order_position: number
          page_location: string
          pricing_model: string | null
          sponsor_name: string | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          clicks?: number | null
          cost_per_click?: number | null
          cost_per_impression?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url: string
          impressions?: number | null
          is_active?: boolean
          link_url?: string | null
          monthly_fee?: number | null
          order_position?: number
          page_location: string
          pricing_model?: string | null
          sponsor_name?: string | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          clicks?: number | null
          cost_per_click?: number | null
          cost_per_impression?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string
          impressions?: number | null
          is_active?: boolean
          link_url?: string | null
          monthly_fee?: number | null
          order_position?: number
          page_location?: string
          pricing_model?: string | null
          sponsor_name?: string | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      farmer_actions: {
        Row: {
          action_data: Json | null
          action_type: string
          created_at: string
          crop_type: string | null
          district: string | null
          id: string
          session_id: string | null
          user_id: string
        }
        Insert: {
          action_data?: Json | null
          action_type: string
          created_at?: string
          crop_type?: string | null
          district?: string | null
          id?: string
          session_id?: string | null
          user_id: string
        }
        Update: {
          action_data?: Json | null
          action_type?: string
          created_at?: string
          crop_type?: string | null
          district?: string | null
          id?: string
          session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      farmers: {
        Row: {
          created_at: string
          crop_type: string | null
          district: string | null
          email: string
          full_name: string
          id: string
          last_activity: string | null
          state: string | null
          status: string
          village: string | null
        }
        Insert: {
          created_at?: string
          crop_type?: string | null
          district?: string | null
          email: string
          full_name: string
          id?: string
          last_activity?: string | null
          state?: string | null
          status?: string
          village?: string | null
        }
        Update: {
          created_at?: string
          crop_type?: string | null
          district?: string | null
          email?: string
          full_name?: string
          id?: string
          last_activity?: string | null
          state?: string | null
          status?: string
          village?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string
          feedback_type: string
          id: string
          rating: number
          related_analysis_id: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          feedback_type: string
          id?: string
          rating: number
          related_analysis_id?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          feedback_type?: string
          id?: string
          rating?: number
          related_analysis_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      product_recommendations: {
        Row: {
          analysis_id: string
          created_at: string
          crop_type: string | null
          disease_detected: string | null
          id: string
          is_competitor: boolean | null
          product_name: string
          product_type: string
          user_id: string
        }
        Insert: {
          analysis_id: string
          created_at?: string
          crop_type?: string | null
          disease_detected?: string | null
          id?: string
          is_competitor?: boolean | null
          product_name: string
          product_type: string
          user_id: string
        }
        Update: {
          analysis_id?: string
          created_at?: string
          crop_type?: string | null
          disease_detected?: string | null
          id?: string
          is_competitor?: boolean | null
          product_name?: string
          product_type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      shop_analytics: {
        Row: {
          created_at: string
          event_type: string
          id: string
          ip_address: string | null
          product_id: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          ip_address?: string | null
          product_id?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: string | null
          product_id?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shop_analytics_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "shop_items"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_items: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean
          name: string
          price: number
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          name: string
          price: number
          stock_quantity?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          name?: string
          price?: number
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: []
      }
      tutorials: {
        Row: {
          content: string
          created_at: string
          description: string | null
          difficulty_level: string
          duration_minutes: number | null
          featured_image_url: string | null
          id: string
          is_published: boolean
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content: string
          created_at?: string
          description?: string | null
          difficulty_level: string
          duration_minutes?: number | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          description?: string | null
          difficulty_level?: string
          duration_minutes?: number | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          actions_performed: number | null
          duration_seconds: number | null
          end_time: string | null
          id: string
          pages_visited: number | null
          session_id: string
          start_time: string
          user_id: string
        }
        Insert: {
          actions_performed?: number | null
          duration_seconds?: number | null
          end_time?: string | null
          id?: string
          pages_visited?: number | null
          session_id: string
          start_time?: string
          user_id: string
        }
        Update: {
          actions_performed?: number | null
          duration_seconds?: number | null
          end_time?: string | null
          id?: string
          pages_visited?: number | null
          session_id?: string
          start_time?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
