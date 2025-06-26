
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
import { Plus, Edit, Trash2, Eye, EyeOff, Clock } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description?: string;
  content: string;
  difficulty_level: string; // Changed from literal union to string
  duration_minutes?: number;
  featured_image_url?: string;
  video_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface TutorialManagementProps {
  tutorials: Tutorial[];
  onAddTutorial: (tutorial: Omit<Tutorial, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateTutorial: (id: string, updates: Partial<Tutorial>) => void;
  onDeleteTutorial: (id: string) => void;
}

export const TutorialManagement: React.FC<TutorialManagementProps> = ({
  tutorials,
  onAddTutorial,
  onUpdateTutorial,
  onDeleteTutorial
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    difficulty_level: 'beginner' as string, // Changed type annotation
    duration_minutes: 0,
    featured_image_url: '',
    video_url: '',
    is_published: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      difficulty_level: 'beginner',
      duration_minutes: 0,
      featured_image_url: '',
      video_url: '',
      is_published: false
    });
    setEditingTutorial(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTutorial) {
      onUpdateTutorial(editingTutorial.id, formData);
    } else {
      onAddTutorial(formData);
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (tutorial: Tutorial) => {
    setEditingTutorial(tutorial);
    setFormData({
      title: tutorial.title,
      description: tutorial.description || '',
      content: tutorial.content,
      difficulty_level: tutorial.difficulty_level,
      duration_minutes: tutorial.duration_minutes || 0,
      featured_image_url: tutorial.featured_image_url || '',
      video_url: tutorial.video_url || '',
      is_published: tutorial.is_published
    });
    setIsDialogOpen(true);
  };

  const handleTogglePublished = (tutorial: Tutorial) => {
    onUpdateTutorial(tutorial.id, { is_published: !tutorial.is_published });
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tutorial Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Tutorial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTutorial ? 'Edit Tutorial' : 'Add New Tutorial'}
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
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty_level">Difficulty Level</Label>
                  <Select 
                    value={formData.difficulty_level} 
                    onValueChange={(value: string) => 
                      setFormData(prev => ({ ...prev, difficulty_level: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                  <Input
                    id="duration_minutes"
                    type="number"
                    min="0"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="featured_image_url">Featured Image URL</Label>
                  <Input
                    id="featured_image_url"
                    type="url"
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input
                    id="video_url"
                    type="url"
                    value={formData.video_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                  {editingTutorial ? 'Update' : 'Create'} Tutorial
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {tutorials.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tutorials yet. Create your first tutorial!
          </div>
        ) : (
          tutorials.map((tutorial) => (
            <div key={tutorial.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-white">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold">{tutorial.title}</h3>
                  <Badge variant={tutorial.is_published ? "default" : "secondary"}>
                    {tutorial.is_published ? "Published" : "Draft"}
                  </Badge>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tutorial.difficulty_level)}`}>
                    {tutorial.difficulty_level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{tutorial.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {tutorial.duration_minutes && (
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {tutorial.duration_minutes} min
                    </span>
                  )}
                  <span>{new Date(tutorial.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleTogglePublished(tutorial)}
                >
                  {tutorial.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(tutorial)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteTutorial(tutorial.id)}
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
  );
};
