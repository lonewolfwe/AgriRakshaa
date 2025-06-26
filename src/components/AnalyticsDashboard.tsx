
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, MapPin, Users, Activity, RefreshCw, Download } from 'lucide-react';

interface AnalyticsData {
  diseasesTrends: any[];
  productClickRates: any[];
  userActivity: any[];
  locationHeatmap: any[];
  totalFarmers: number;
  totalFeedback: number;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
  onRefresh: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data, onRefresh }) => {
  // Process disease trends data
  const diseaseTrendsData = useMemo(() => {
    const trends = data.diseasesTrends.reduce((acc: Record<string, any>, item: any) => {
      const disease = item.disease_detected || 'Unknown';
      const crop = item.crop_type || 'Unknown';
      const key = `${disease}-${crop}`;
      
      if (!acc[key]) {
        acc[key] = { disease, crop, count: 0 };
      }
      acc[key].count++;
      return acc;
    }, {});

    return Object.values(trends).slice(0, 10); // Top 10
  }, [data.diseasesTrends]);

  // Process product click rates
  const productClickData = useMemo(() => {
    const clicks = data.productClickRates.reduce((acc: Record<string, any>, item: any) => {
      const product = item.product_name;
      if (!acc[product]) {
        acc[product] = { product, clicks: 0, type: item.product_type };
      }
      acc[product].clicks++;
      return acc;
    }, {});

    return Object.values(clicks).slice(0, 8); // Top 8
  }, [data.productClickRates]);

  // Process user activity data
  const userActivityData = useMemo(() => {
    const monthlyActivity = data.userActivity.reduce((acc: Record<string, any>, session: any) => {
      const month = new Date(session.start_time).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = { month, sessions: 0, totalDuration: 0 };
      }
      acc[month].sessions++;
      acc[month].totalDuration += session.duration_seconds || 0;
      return acc;
    }, {});

    return Object.values(monthlyActivity).slice(-6); // Last 6 months
  }, [data.userActivity]);

  // Process location heatmap data
  const locationData = useMemo(() => {
    const locations = data.locationHeatmap.reduce((acc: Record<string, any>, item: any) => {
      const district = item.district || 'Unknown';
      if (!acc[district]) {
        acc[district] = { district, uploads: 0, crops: new Set() };
      }
      acc[district].uploads++;
      if (item.crop_type) {
        acc[district].crops.add(item.crop_type);
      }
      return acc;
    }, {});

    return Object.values(locations).map((loc: any) => ({
      ...loc,
      cropTypes: loc.crops.size
    })).slice(0, 10);
  }, [data.locationHeatmap]);

  const chartConfig = {
    disease: {
      label: "Disease Cases",
      color: "#ef4444",
    },
    clicks: {
      label: "Click Rate",
      color: "#3b82f6",
    },
    sessions: {
      label: "Sessions",
      color: "#10b981",
    },
    uploads: {
      label: "Image Uploads",
      color: "#f59e0b",
    },
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-gray-600">Track disease trends, user activity, and platform performance</p>
        </div>
        <Button onClick={onRefresh} variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Data</span>
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Diagnoses</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.diseasesTrends.length}</div>
            <p className="text-xs text-muted-foreground">Disease cases detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Clicks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.productClickRates.length}</div>
            <p className="text-xs text-muted-foreground">Product recommendations clicked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.userActivity.length}</div>
            <p className="text-xs text-muted-foreground">User sessions recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location Coverage</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locationData.length}</div>
            <p className="text-xs text-muted-foreground">Districts with activity</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Disease Detection Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={diseaseTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="disease" tick={{ fontSize: 12 }} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-disease)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Product Click Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Product Recommendation Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={productClickData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ product, percent }: any) => `${product} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="clicks"
                >
                  {productClickData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* User Activity Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="sessions" stroke="var(--color-sessions)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Location Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Location Activity Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" tick={{ fontSize: 10 }} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="uploads" fill="var(--color-uploads)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Diseases by Region */}
        <Card>
          <CardHeader>
            <CardTitle>Top Diseases by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {diseaseTrendsData.slice(0, 5).map((item: any, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">{item.disease}</div>
                    <div className="text-sm text-gray-600">{item.crop}</div>
                  </div>
                  <div className="text-lg font-bold text-red-600">{item.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations by Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Most Active Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {locationData.slice(0, 5).map((item: any, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">{item.district}</div>
                    <div className="text-sm text-gray-600">{item.cropTypes} crop types</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">{item.uploads}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
