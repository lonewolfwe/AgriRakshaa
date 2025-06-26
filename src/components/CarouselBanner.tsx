
import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link_url?: string;
  page_location: 'homepage' | 'results';
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  order_position: number;
  sponsor_name?: string;
  pricing_model?: 'performance' | 'fixed_monthly';
  impressions?: number;
  clicks?: number;
  monthly_fee?: number;
  cost_per_click?: number;
  cost_per_impression?: number;
}

interface CarouselBannerProps {
  location: 'homepage' | 'results';
  className?: string;
}

export const CarouselBanner: React.FC<CarouselBannerProps> = ({ location, className = '' }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const impressionTracked = useRef<Set<string>>(new Set());

  useEffect(() => {
    fetchBanners();
  }, [location]);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('page_location', location)
        .eq('is_active', true)
        .order('order_position', { ascending: true });

      if (error) throw error;

      // Filter banners based on date range
      const activeBanners = data?.filter(banner => {
        const now = new Date();
        const startDate = banner.start_date ? new Date(banner.start_date) : null;
        const endDate = banner.end_date ? new Date(banner.end_date) : null;

        if (startDate && startDate > now) return false;
        if (endDate && endDate < now) return false;

        return true;
      }) || [];

      setBanners(activeBanners as Banner[]);
      
      // Track impressions for all visible banners
      activeBanners.forEach(banner => {
        if (!impressionTracked.current.has(banner.id)) {
          trackImpression(banner.id);
          impressionTracked.current.add(banner.id);
        }
      });
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackImpression = async (bannerId: string) => {
    try {
      // Track in banner_analytics table
      await supabase
        .from('banner_analytics')
        .insert({
          banner_id: bannerId,
          event_type: 'impression',
          user_id: (await supabase.auth.getUser()).data.user?.id || null,
          session_id: `session_${Date.now()}`,
          ip_address: 'client-side',
          user_agent: navigator.userAgent
        });

      // Increment impression counter on banner
      const { data: currentBanner } = await supabase
        .from('banners')
        .select('impressions')
        .eq('id', bannerId)
        .single();

      if (currentBanner) {
        await supabase
          .from('banners')
          .update({ 
            impressions: (currentBanner.impressions || 0) + 1
          })
          .eq('id', bannerId);
      }
    } catch (error) {
      console.error('Error tracking impression:', error);
    }
  };

  const trackClick = async (bannerId: string) => {
    try {
      // Track in banner_analytics table
      await supabase
        .from('banner_analytics')
        .insert({
          banner_id: bannerId,
          event_type: 'click',
          user_id: (await supabase.auth.getUser()).data.user?.id || null,
          session_id: `session_${Date.now()}`,
          ip_address: 'client-side',
          user_agent: navigator.userAgent
        });

      // Increment click counter on banner
      const { data: currentBanner } = await supabase
        .from('banners')
        .select('clicks')
        .eq('id', bannerId)
        .single();

      if (currentBanner) {
        await supabase
          .from('banners')
          .update({ 
            clicks: (currentBanner.clicks || 0) + 1
          })
          .eq('id', bannerId);
      }
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleBannerClick = async (banner: Banner) => {
    if (banner.link_url) {
      await trackClick(banner.id);
      window.open(banner.link_url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className={`w-full h-48 bg-gray-200 animate-pulse rounded-lg ${className}`}></div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <Card className="border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className={`relative w-full h-48 md:h-64 bg-gradient-to-r from-green-500 to-emerald-600 ${
                      banner.link_url ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
                    }`}
                    onClick={() => handleBannerClick(banner)}
                  >
                    <img
                      src={banner.image_url}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="text-center text-white p-6 max-w-2xl">
                        {banner.sponsor_name && (
                          <div className="text-sm opacity-75 mb-2">
                            Sponsored by {banner.sponsor_name}
                          </div>
                        )}
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">
                          {banner.title}
                        </h3>
                        {banner.description && (
                          <p className="text-lg md:text-xl opacity-90 mb-4">
                            {banner.description}
                          </p>
                        )}
                        {banner.link_url && (
                          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                            <span>Buy Now</span>
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {banners.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>
    </div>
  );
};
