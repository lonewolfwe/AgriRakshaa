
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, ExternalLink } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link_url?: string;
  page_location: string; // Changed from literal union to string
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

interface BannerManagementProps {
  banners: Banner[];
  onAddBanner: (banner: Omit<Banner, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateBanner: (id: string, updates: Partial<Banner>) => void;
  onDeleteBanner: (id: string) => void;
}

export const BannerManagement: React.FC<BannerManagementProps> = ({
  banners,
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    page_location: 'homepage' as string, // Changed type annotation
    is_active: true,
    start_date: '',
    end_date: '',
    order_position: 1
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      link_url: '',
      page_location: 'homepage',
      is_active: true,
      start_date: '',
      end_date: '',
      order_position: 1
    });
    setEditingBanner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBanner) {
      onUpdateBanner(editingBanner.id, formData);
    } else {
      onAddBanner(formData);
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description,
      image_url: banner.image_url,
      link_url: banner.link_url || '',
      page_location: banner.page_location,
      is_active: banner.is_active,
      start_date: banner.start_date ? banner.start_date.split('T')[0] : '',
      end_date: banner.end_date ? banner.end_date.split('T')[0] : '',
      order_position: banner.order_position
    });
    setIsDialogOpen(true);
  };

  const handleToggleActive = (banner: Banner) => {
    onUpdateBanner(banner.id, { is_active: !banner.is_active });
  };

  // Group banners by page location
  const homepageBanners = banners.filter(b => b.page_location === 'homepage');
  const resultsBanners = banners.filter(b => b.page_location === 'results');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Banner Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <Label htmlFor="link_url">Link URL (Optional)</Label>
                <Input
                  id="link_url"
                  type="url"
                  value={formData.link_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="page_location">Page Location</Label>
                  <Select 
                    value={formData.page_location} 
                    onValueChange={(value: string) => 
                      setFormData(prev => ({ ...prev, page_location: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homepage">Homepage</SelectItem>
                      <SelectItem value="results">Results Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order_position">Order Position</Label>
                  <Input
                    id="order_position"
                    type="number"
                    min="1"
                    value={formData.order_position}
                    onChange={(e) => setFormData(prev => ({ ...prev, order_position: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date (Optional)</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date (Optional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                  {editingBanner ? 'Update' : 'Create'} Banner
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Homepage Banners Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">Homepage</span>
          Banners ({homepageBanners.length})
        </h3>
        <div className="space-y-4">
          {homepageBanners.length === 0 ? (
            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
              No homepage banners yet. Create your first banner!
            </div>
          ) : (
            homepageBanners.map((banner) => (
              <div key={banner.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-white">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{banner.title}</h3>
                    <Badge variant={banner.is_active ? "default" : "secondary"}>
                      {banner.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-xs text-gray-500">#{banner.order_position}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {banner.link_url && (
                      <span className="flex items-center">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Has Link
                      </span>
                    )}
                    {banner.start_date && (
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(banner.start_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(banner)}
                  >
                    {banner.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(banner)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDeleteBanner(banner.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Results Page Banners Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-2">Results</span>
          Banners ({resultsBanners.length})
        </h3>
        <div className="space-y-4">
          {resultsBanners.length === 0 ? (
            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
              No results page banners yet. Create your first banner!
            </div>
          ) : (
            resultsBanners.map((banner) => (
              <div key={banner.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-white">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{banner.title}</h3>
                    <Badge variant={banner.is_active ? "default" : "secondary"}>
                      {banner.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-xs text-gray-500">#{banner.order_position}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {banner.link_url && (
                      <span className="flex items-center">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Has Link
                      </span>
                    )}
                    {banner.start_date && (
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(banner.start_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(banner)}
                  >
                    {banner.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(banner)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDeleteBanner(banner.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
