import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, Phone, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SMSAlerts = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifications, setNotifications] = useState({
    weather: true,
    market: true,
    crop: true,
    equipment: false,
    expert: true
  });

  const { toast } = useToast();

  const handleSaveSettings = () => {
    if (phoneNumber.trim().length === 0) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your mobile number to enable SMS alerts.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("smsAlerts", JSON.stringify({
      phoneNumber,
      notifications,
      enabled: true,
    }));

    toast({
      title: "SMS Alerts Configured",
      description: "Your SMS alert preferences have been saved successfully.",
    });
  };

  const alertTypes = [
    {
      key: "weather",
      label: "Weather Alerts",
      description: "Severe weather warnings",
      priority: "high",
    },
    {
      key: "market",
      label: "Market Updates",
      description: "Price changes & trends",
    },
    {
      key: "crop",
      label: "Crop Advisory",
      description: "Farming recommendations",
      priority: "high",
    },
    {
      key: "equipment",
      label: "Equipment Alerts",
      description: "Maintenance reminders",
    },
    {
      key: "expert",
      label: "Expert Consultation",
      description: "Expert advice available",
    }
  ];

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
          <Bell className="w-6 h-6" />
          SMS Alert Settings
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Phone Number Input */}
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Number</Label>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Alert Types */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Alert Types</h3>
            {alertTypes.map((alert) => (
              <div
                key={alert.key}
                className="flex items-center justify-between p-3 bg-white/70 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800">
                      {alert.label}
                    </p>
                    {alert.priority === "high" && (
                      <Badge variant="destructive" className="text-xs">
                        High Priority
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{alert.description}</p>
                </div>
                <Switch
                  checked={notifications[alert.key as keyof typeof notifications]}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [alert.key]: checked,
                    }))
                  }
                />
              </div>
            ))}
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSaveSettings}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save SMS Alert Settings
          </Button>

          {/* Status Message */}
          <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-300 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">
              SMS alerts will be sent for selected events
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SMSAlerts;
