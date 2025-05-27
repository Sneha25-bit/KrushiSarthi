
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sprout, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const CropAdvisory = () => {
  const advisories = [
    {
      crop: "Cotton",
      stage: "Flowering",
      priority: "high",
      task: "Apply potash fertilizer",
      dueDate: "Next 3 days",
      status: "pending"
    },
    {
      crop: "Wheat",
      stage: "Germination", 
      priority: "medium",
      task: "Monitor for pest activity",
      dueDate: "This week",
      status: "in-progress"
    },
    {
      crop: "Sugarcane",
      stage: "Tillering",
      priority: "low",
      task: "Irrigation scheduling",
      dueDate: "Next week",
      status: "completed"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2 text-green-700">
          <Sprout className="w-6 h-6" />
          Crop Advisory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {advisories.map((advisory, index) => (
            <div key={index} className="p-4 bg-white/70 rounded-lg border border-green-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{advisory.crop}</h3>
                  <Badge variant="outline" className="text-xs">
                    {advisory.stage}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(advisory.status)}
                  <Badge className={`text-xs ${getPriorityColor(advisory.priority)}`}>
                    {advisory.priority}
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-600 mb-2">{advisory.task}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{advisory.dueDate}</span>
                </div>
                <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
          View All Advisories
        </Button>
      </CardContent>
    </Card>
  );
};

export default CropAdvisory;
