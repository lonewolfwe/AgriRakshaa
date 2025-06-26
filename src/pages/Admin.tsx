
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, BarChart3, TrendingUp } from 'lucide-react';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';

interface AnalyticsData {
  diseasesTrends: any[];
  productClickRates: any[];
  userActivity: any[];
  locationHeatmap: any[];
  totalFarmers: number;
  totalFeedback: number;
}

const Admin = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    diseasesTrends: [],
    productClickRates: [],
    userActivity: [],
    locationHeatmap: [],
    totalFarmers: 0,
    totalFeedback: 0
  });
  const [stats, setStats] = useState({
    totalFeedback: 0
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch analytics data
      await fetchAnalyticsData();

      // Calculate stats
      const { data: feedbackData } = await supabase
        .from('feedback')
        .select('id');
      const totalFeedback = feedbackData?.length || 0;

      setStats({
        totalFeedback
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      // Fetch disease trends
      const { data: diseasesTrends } = await supabase
        .from('product_recommendations')
        .select('disease_detected, crop_type, created_at')
        .not('disease_detected', 'is', null);

      // Fetch product click rates
      const { data: productClickRates } = await supabase
        .from('product_recommendations')
        .select('product_name, product_type, created_at, crop_type');

      // Fetch user activity
      const { data: userActivity } = await supabase
        .from('user_sessions')
        .select('*')
        .order('start_time', { ascending: false });

      // Fetch location data for heatmap
      const { data: locationHeatmap } = await supabase
        .from('farmer_actions')
        .select('district, crop_type, created_at')
        .not('district', 'is', null);

      setAnalyticsData({
        diseasesTrends: diseasesTrends || [],
        productClickRates: productClickRates || [],
        userActivity: userActivity || [],
        locationHeatmap: locationHeatmap || [],
        totalFarmers: 0,
        totalFeedback: 0
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Agri Raksha platform</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFeedback}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Analytics</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Live Data</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Activity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.userActivity.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Platform Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsDashboard
              data={analyticsData}
              onRefresh={fetchAnalyticsData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
