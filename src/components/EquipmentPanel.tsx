
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Wrench,
  Trash2,
  Edit,
  Calendar,
  DollarSign,
  Settings
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Equipment {
  id: string;
  name: string;
  type: string;
  purchaseDate: string;
  cost: number;
  status: 'working' | 'maintenance' | 'broken';
  description: string;
}

const EquipmentPanel = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'Tractor John Deere 5050D',
      type: 'Tractor',
      purchaseDate: '2022-03-15',
      cost: 850000,
      status: 'working',
      description: 'Primary farming tractor for field work'
    },
    {
      id: '2',
      name: 'Harvester Combine',
      type: 'Harvester',
      purchaseDate: '2021-08-20',
      cost: 1200000,
      status: 'maintenance',
      description: 'Used for wheat and rice harvesting'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: '',
    purchaseDate: '',
    cost: 0,
    status: 'working' as Equipment['status'],
    description: ''
  });

  const handleAddEquipment = () => {
    const equipment_item: Equipment = {
      id: Date.now().toString(),
      ...newEquipment
    };
    setEquipment(prev => [...prev, equipment_item]);
    setNewEquipment({
      name: '',
      type: '',
      purchaseDate: '',
      cost: 0,
      status: 'working',
      description: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteEquipment = (id: string) => {
    setEquipment(prev => prev.filter(item => item.id !== id));
  };

  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'working': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'broken': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Equipment['status']) => {
    switch (status) {
      case 'working': return <Wrench className="w-4 h-4 text-green-600" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-600" />;
      case 'broken': return <Settings className="w-4 h-4 text-red-600" />;
      default: return <Wrench className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
            <Wrench className="w-5 h-5" />
            Equipment Management
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" />
                Add Equipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Equipment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Equipment Name</Label>
                  <Input
                    id="name"
                    value={newEquipment.name}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Tractor John Deere"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={newEquipment.type}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="e.g., Tractor, Harvester"
                  />
                </div>
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={newEquipment.purchaseDate}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cost">Cost (₹)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={newEquipment.cost}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, cost: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newEquipment.description}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of equipment"
                  />
                </div>
                <Button onClick={handleAddEquipment} className="w-full">
                  Add Equipment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {equipment.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-blue-100">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{item.type}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    ₹{item.cost.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteEquipment(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {equipment.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Wrench className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No equipment added yet</p>
              <p className="text-sm">Click "Add Equipment" to get started</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentPanel;
