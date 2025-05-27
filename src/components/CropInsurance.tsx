
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, FileText, Phone, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CropInsurance = () => {
  const [application, setApplication] = useState({
    farmerName: "",
    cropType: "",
    fieldSize: "",
    estimatedYield: "",
    insuredAmount: "",
    premium: ""
  });
  const { toast } = useToast();

  const cropOptions = [
    "Cotton", "Wheat", "Rice", "Sugarcane", "Soybean", "Maize", "Tomato", "Potato", "Onion", "Groundnut"
  ];

  const calculatePremium = () => {
    const amount = parseFloat(application.insuredAmount);
    if (amount) {
      const premium = Math.round(amount * 0.02); // 2% premium rate
      setApplication(prev => ({ ...prev, premium: premium.toString() }));
    }
  };

  const submitApplication = () => {
    if (!application.farmerName || !application.cropType || !application.fieldSize) {
      toast({
        title: "Incomplete Application",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application Submitted",
      description: "Your crop insurance application has been submitted successfully. Reference ID: CI" + Date.now(),
    });

    // Reset form
    setApplication({
      farmerName: "",
      cropType: "",
      fieldSize: "",
      estimatedYield: "",
      insuredAmount: "",
      premium: ""
    });
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2 text-purple-700">
          <Shield className="w-6 h-6" />
          Crop Insurance Application
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Application Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Farmer Name</Label>
              <Input
                placeholder="Enter your full name"
                value={application.farmerName}
                onChange={(e) => setApplication(prev => ({ ...prev, farmerName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Crop Type</Label>
              <Select onValueChange={(value) => setApplication(prev => ({ ...prev, cropType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropOptions.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Field Size (Acres)</Label>
              <Input
                type="number"
                placeholder="Enter field size"
                value={application.fieldSize}
                onChange={(e) => setApplication(prev => ({ ...prev, fieldSize: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Expected Yield (Quintals)</Label>
              <Input
                type="number"
                placeholder="Enter expected yield"
                value={application.estimatedYield}
                onChange={(e) => setApplication(prev => ({ ...prev, estimatedYield: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Insured Amount (₹)</Label>
              <Input
                type="number"
                placeholder="Enter insured amount"
                value={application.insuredAmount}
                onChange={(e) => {
                  setApplication(prev => ({ ...prev, insuredAmount: e.target.value }));
                  setTimeout(calculatePremium, 100);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Premium Amount (₹)</Label>
              <Input
                type="number"
                placeholder="Auto-calculated"
                value={application.premium}
                readOnly
                className="bg-gray-100"
              />
            </div>
          </div>

          {/* Coverage Details */}
          <div className="p-4 bg-white/70 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Coverage Includes:</h3>
            <ul className="space-y-1 text-sm text-purple-700">
              <li>• Natural disasters (drought, flood, cyclone)</li>
              <li>• Pest and disease attacks</li>
              <li>• Fire and lightning damage</li>
              <li>• Hailstorm and unseasonal rainfall</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={submitApplication} className="flex-1 bg-purple-600 hover:bg-purple-700">
              <FileText className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
            <Button variant="outline" className="border-purple-300 text-purple-700">
              <Phone className="w-4 h-4 mr-2" />
              Contact Agent
            </Button>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-300 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">
              Premium subsidy available under PM-FASAL BIMA YOJANA
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropInsurance;
