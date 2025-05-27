
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import FertilizerCalculator from "@/components/FertilizerCalculator";
import CropInsurance from "@/components/CropInsurance";
import ExpertConsultation from "@/components/ExpertConsultation";
import CommunityForum from "@/components/CommunityForum";
import SMSAlerts from "@/components/SMSAlerts";
import { 
  Calculator, 
  Shield, 
  Phone, 
  Users, 
  Bell,
  Leaf
} from "lucide-react";

const Tools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Farming Tools
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete suite of tools for modern farming - from calculations to community support
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Insurance
            </TabsTrigger>
            <TabsTrigger value="expert" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Expert
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              SMS Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <FertilizerCalculator />
          </TabsContent>

          <TabsContent value="insurance">
            <CropInsurance />
          </TabsContent>

          <TabsContent value="expert">
            <ExpertConsultation />
          </TabsContent>

          <TabsContent value="community">
            <CommunityForum />
          </TabsContent>

          <TabsContent value="alerts">
            <SMSAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tools;
