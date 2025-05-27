
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const MarketPrices = () => {
  const marketData = [
    {
      crop: "Cotton",
      price: "₹6,200",
      change: "+5.2%",
      trend: "up",
      market: "Nagpur"
    },
    {
      crop: "Wheat", 
      price: "₹2,350",
      change: "-2.1%",
      trend: "down",
      market: "Delhi"
    },
    {
      crop: "Rice",
      price: "₹3,800",
      change: "0.0%",
      trend: "stable",
      market: "Pune"
    },
    {
      crop: "Sugarcane",
      price: "₹320",
      change: "+1.8%", 
      trend: "up",
      market: "Kolhapur"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      case 'stable': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
          <TrendingUp className="w-5 h-5" />
          Market Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">{item.crop}</h4>
                <p className="text-sm text-gray-500">{item.market}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{item.price}</p>
                <div className="flex items-center gap-1">
                  {getTrendIcon(item.trend)}
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getTrendColor(item.trend)}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 Cotton prices are rising. Consider selling if you have stock ready.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPrices;
