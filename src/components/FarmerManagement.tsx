
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Filter, Download, UserCheck, UserX, Ban, MessageCircle, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Farmer {
  id: string;
  full_name: string;
  email: string;
  crop_type?: string;
  district?: string;
  state?: string;
  village?: string;
  status: string;
  created_at: string;
  last_activity?: string;
}

interface FarmerManagementProps {
  farmers: Farmer[];
  onUpdateFarmer: (id: string, updates: Partial<Farmer>) => void;
  onDeleteFarmer: (id: string) => void;
}

export const FarmerManagement: React.FC<FarmerManagementProps> = ({
  farmers,
  onUpdateFarmer,
  onDeleteFarmer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [filterCrop, setFilterCrop] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Get unique values for filters
  const uniqueStates = useMemo(() => {
    const states = farmers.map(f => f.state).filter(Boolean);
    return [...new Set(states)];
  }, [farmers]);

  const uniqueCrops = useMemo(() => {
    const crops = farmers.map(f => f.crop_type).filter(Boolean);
    return [...new Set(crops)];
  }, [farmers]);

  // Filter farmers based on search and filters
  const filteredFarmers = useMemo(() => {
    return farmers.filter(farmer => {
      const matchesSearch = farmer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           farmer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = filterState === 'all' || farmer.state === filterState;
      const matchesCrop = filterCrop === 'all' || farmer.crop_type === filterCrop;
      const matchesStatus = filterStatus === 'all' || farmer.status === filterStatus;
      
      return matchesSearch && matchesState && matchesCrop && matchesStatus;
    });
  }, [farmers, searchTerm, filterState, filterCrop, filterStatus]);

  const handleStatusChange = (farmerId: string, newStatus: string) => {
    onUpdateFarmer(farmerId, { status: newStatus });
  };

  const handleExportData = async () => {
    try {
      const csvContent = [
        ['Name', 'Email', 'State', 'District', 'Village', 'Crop Type', 'Status', 'Created At', 'Last Activity'],
        ...filteredFarmers.map(farmer => [
          farmer.full_name,
          farmer.email,
          farmer.state || '',
          farmer.district || '',
          farmer.village || '',
          farmer.crop_type || '',
          farmer.status,
          new Date(farmer.created_at).toLocaleDateString(),
          farmer.last_activity ? new Date(farmer.last_activity).toLocaleDateString() : 'Never'
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `farmers-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-500', text: 'Active' },
      inactive: { color: 'bg-gray-500', text: 'Inactive' },
      blocked: { color: 'bg-red-500', text: 'Blocked' },
      suspended: { color: 'bg-yellow-500', text: 'Suspended' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge className={`${config.color} text-white`}>{config.text}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Farmer Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search farmers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterState} onValueChange={setFilterState}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {uniqueStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterCrop} onValueChange={setFilterCrop}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {uniqueCrops.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleExportData} variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{filteredFarmers.length}</div>
              <div className="text-sm text-gray-600">Total Farmers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {filteredFarmers.filter(f => f.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Farmers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {filteredFarmers.filter(f => f.status === 'inactive').length}
              </div>
              <div className="text-sm text-gray-600">Inactive Farmers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {filteredFarmers.filter(f => f.status === 'blocked').length}
              </div>
              <div className="text-sm text-gray-600">Blocked Farmers</div>
            </CardContent>
          </Card>
        </div>

        {/* Farmers Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Crop Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFarmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell className="font-medium">{farmer.full_name}</TableCell>
                  <TableCell>{farmer.email}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {farmer.village && <div>{farmer.village}</div>}
                      {farmer.district && <div>{farmer.district}</div>}
                      {farmer.state && <div className="text-gray-500">{farmer.state}</div>}
                    </div>
                  </TableCell>
                  <TableCell>{farmer.crop_type || 'Not specified'}</TableCell>
                  <TableCell>{getStatusBadge(farmer.status)}</TableCell>
                  <TableCell>
                    {farmer.last_activity 
                      ? new Date(farmer.last_activity).toLocaleDateString()
                      : 'Never'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {farmer.status === 'active' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(farmer.id, 'blocked')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(farmer.id, 'active')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <UserX className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Farmer</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {farmer.full_name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteFarmer(farmer.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredFarmers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No farmers found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
