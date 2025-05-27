
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Video, MessageCircle, Star, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExpertConsultation = () => {
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [consultationForm, setConsultationForm] = useState({
    issue: "",
    description: "",
    urgency: "medium"
  });
  const { toast } = useToast();

  const experts = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialty: "Crop Protection",
      rating: 4.8,
      experience: "15 years",
      languages: ["Hindi", "English", "Marathi"],
      available: true,
      consultationFee: 500
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialty: "Soil Health",
      rating: 4.9,
      experience: "12 years",
      languages: ["Hindi", "English", "Gujarati"],
      available: true,
      consultationFee: 600
    },
    {
      id: 3,
      name: "Suresh Patil",
      specialty: "Organic Farming",
      rating: 4.7,
      experience: "20 years",
      languages: ["Hindi", "Marathi"],
      available: false,
      consultationFee: 400
    }
  ];

  const bookConsultation = (expert: any, type: string) => {
    if (!consultationForm.issue || !consultationForm.description) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in your farming issue and description",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Consultation Booked",
      description: `${type} consultation with ${expert.name} has been scheduled. You will receive confirmation shortly.`,
    });

    setConsultationForm({ issue: "", description: "", urgency: "medium" });
  };

  return (
    <div className="space-y-6">
      {/* Consultation Form */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
            <MessageCircle className="w-6 h-6" />
            Expert Consultation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What's your farming issue?</Label>
              <Input
                placeholder="e.g., Pest attack on cotton crop"
                value={consultationForm.issue}
                onChange={(e) => setConsultationForm(prev => ({ ...prev, issue: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Detailed Description</Label>
              <Textarea
                placeholder="Describe your problem in detail..."
                value={consultationForm.description}
                onChange={(e) => setConsultationForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <div className="flex gap-2">
                {["low", "medium", "high"].map(level => (
                  <Button
                    key={level}
                    variant={consultationForm.urgency === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setConsultationForm(prev => ({ ...prev, urgency: level }))}
                    className={consultationForm.urgency === level ? "bg-blue-600" : ""}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Experts */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2 text-green-700">
            <Star className="w-6 h-6" />
            Available Experts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experts.map((expert) => (
              <div key={expert.id} className="p-4 bg-white/70 rounded-lg border border-green-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${expert.name}`} />
                      <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-800">{expert.name}</h3>
                      <p className="text-sm text-gray-600">{expert.specialty}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{expert.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">• {expert.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{expert.consultationFee}</p>
                    <p className="text-sm text-gray-500">per consultation</p>
                    <Badge variant={expert.available ? "default" : "secondary"} className="mt-1">
                      {expert.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {expert.languages.map(lang => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                {expert.available && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => bookConsultation(expert, "Phone")}
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call Now
                    </Button>
                    <Button
                      onClick={() => bookConsultation(expert, "Video")}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-green-300 text-green-700"
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Video Call
                    </Button>
                    <Button
                      onClick={() => bookConsultation(expert, "Chat")}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-green-300 text-green-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertConsultation;
