
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind,
  TrendingUp,
  Sprout,
  MapPin,
  Phone,
  Users,
  Calendar,
  AlertTriangle,
  Leaf
} from "lucide-react";
import Header from "@/components/Header";
import WeatherCard from "@/components/WeatherCard";
import CropAdvisory from "@/components/CropAdvisory";
import MarketPrices from "@/components/MarketPrices";
import QuickActions from "@/components/QuickActions";
import EquipmentPanel from "@/components/EquipmentPanel";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("Maharashtra");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                KrushiSarthi
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              आपका विश्वसनीय कृषि साथी - Your trusted farming companion for better yields, informed decisions, and sustainable agriculture
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Start Farming Smart
            </Button>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Weather & Advisory */}
            <div className="lg:col-span-2 space-y-6">
              <WeatherCard location={selectedLocation} />
              <CropAdvisory />
              <EquipmentPanel />
            </div>
            
            {/* Right Column - Market & Actions */}
            <div className="space-y-6">
              <MarketPrices />
              <QuickActions />
              
              {/* Expert Support Card */}
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-700">
                    <Phone className="w-5 h-5" />
                    Expert Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-600 mb-3">
                    Connect with agricultural experts for personalized advice
                  </p>
                  <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100">
                    Call Expert Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
