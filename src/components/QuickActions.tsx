
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Calculator,
  BookOpen,
  Truck,
  Shield,
  Users,
  MapPin,
  Bell,
  Phone
} from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Calculator,
      title: "Fertilizer Calculator",
      description: "Calculate fertilizer needs",
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: () => navigate('/tools?tab=calculator')
    },
    {
      icon: Shield,
      title: "Crop Insurance",
      description: "Protect your crops",
      color: "bg-purple-500 hover:bg-purple-600",
      onClick: () => navigate('/tools?tab=insurance')
    },
    {
      icon: Phone,
      title: "Expert Consultation",
      description: "Talk to experts",
      color: "bg-green-500 hover:bg-green-600",
      onClick: () => navigate('/tools?tab=expert')
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with farmers",
      color: "bg-teal-500 hover:bg-teal-600",
      onClick: () => navigate('/tools?tab=community')
    },
    {
      icon: Bell,
      title: "SMS Alerts",
      description: "Get notifications",
      color: "bg-orange-500 hover:bg-orange-600",
      onClick: () => navigate('/tools?tab=alerts')
    },
    {
      icon: BookOpen,
      title: "Crop Guide",
      description: "Access farming guides",
      color: "bg-indigo-500 hover:bg-indigo-600",
      onClick: () => window.open('https://farmer.gov.in/cropguide.aspx', '_blank')
    }
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all duration-300"
              onClick={action.onClick}
            >
              <action.icon className="w-6 h-6 text-gray-600" />
              <div className="text-center">
                <p className="font-medium text-sm text-gray-800">{action.title}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
