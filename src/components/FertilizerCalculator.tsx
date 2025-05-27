
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FertilizerCalculator = () => {
  const [formData, setFormData] = useState({
    cropType: "",
    fieldSize: "",
    soilType: "",
    season: ""
  });
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const cropOptions = [
    "Cotton", "Wheat", "Rice", "Sugarcane", "Soybean", "Maize", "Tomato", "Potato"
  ];

  const soilTypes = [
    "Sandy", "Clay", "Loamy", "Silt", "Red Soil", "Black Soil"
  ];

  const calculateFertilizer = () => {
    if (!formData.cropType || !formData.fieldSize || !formData.soilType) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Mock calculation based on crop and soil type
    const baseNPK = {
      "Cotton": { N: 120, P: 60, K: 60 },
      "Wheat": { N: 150, P: 60, K: 40 },
      "Rice": { N: 120, P: 60, K: 40 },
      "Sugarcane": { N: 280, P: 90, K: 90 },
      "Soybean": { N: 30, P: 60, K: 40 },
      "Maize": { N: 150, P: 75, K: 75 }
    };

    const crop = formData.cropType as keyof typeof baseNPK;
    const fieldSizeNum = parseFloat(formData.fieldSize);
    const npk = baseNPK[crop] || baseNPK["Cotton"];

    setResults({
      nitrogen: Math.round(npk.N * fieldSizeNum),
      phosphorus: Math.round(npk.P * fieldSizeNum),
      potassium: Math.round(npk.K * fieldSizeNum),
      urea: Math.round((npk.N * fieldSizeNum) / 0.46),
      dap: Math.round((npk.P * fieldSizeNum) / 0.46),
      mop: Math.round((npk.K * fieldSizeNum) / 0.60)
    });

    toast({
      title: "Calculation Complete",
      description: "Fertilizer recommendations generated successfully"
    });
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2 text-green-700">
          <Calculator className="w-6 h-6" />
          Fertilizer Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Crop Type</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, cropType: value }))}>
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
                value={formData.fieldSize}
                onChange={(e) => setFormData(prev => ({ ...prev, fieldSize: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Soil Type</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, soilType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map(soil => (
                    <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Season</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, season: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                  <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                  <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateFertilizer} className="w-full bg-green-600 hover:bg-green-700">
            Calculate Fertilizer Requirements
          </Button>

          {/* Results */}
          {results && (
            <div className="mt-6 p-4 bg-white/70 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Fertilizer Recommendations
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-100 rounded">
                  <p className="font-bold text-blue-800">{results.nitrogen} kg</p>
                  <p className="text-sm text-blue-600">Nitrogen (N)</p>
                </div>
                <div className="text-center p-3 bg-purple-100 rounded">
                  <p className="font-bold text-purple-800">{results.phosphorus} kg</p>
                  <p className="text-sm text-purple-600">Phosphorus (P)</p>
                </div>
                <div className="text-center p-3 bg-orange-100 rounded">
                  <p className="font-bold text-orange-800">{results.potassium} kg</p>
                  <p className="text-sm text-orange-600">Potassium (K)</p>
                </div>
                <div className="text-center p-3 bg-green-100 rounded">
                  <p className="font-bold text-green-800">{results.urea} kg</p>
                  <p className="text-sm text-green-600">Urea</p>
                </div>
                <div className="text-center p-3 bg-red-100 rounded">
                  <p className="font-bold text-red-800">{results.dap} kg</p>
                  <p className="text-sm text-red-600">DAP</p>
                </div>
                <div className="text-center p-3 bg-yellow-100 rounded">
                  <p className="font-bold text-yellow-800">{results.mop} kg</p>
                  <p className="text-sm text-yellow-600">MOP</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FertilizerCalculator;
