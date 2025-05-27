
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind,
  Sun,
  CloudRain
} from "lucide-react";

interface WeatherCardProps {
  location: string;
}

const WeatherCard = ({ location }: WeatherCardProps) => {
  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    rainfall: 2.5,
    uvIndex: 6
  };

  const forecast = [
    { day: "Today", temp: "28°", condition: "Partly Cloudy", icon: Cloud },
    { day: "Tomorrow", temp: "30°", condition: "Sunny", icon: Sun },
    { day: "Wed", temp: "26°", condition: "Light Rain", icon: CloudRain },
    { day: "Thu", temp: "27°", condition: "Partly Cloudy", icon: Cloud },
  ];

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
          <Cloud className="w-6 h-6" />
          Weather Forecast - {location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-800">{weatherData.temperature}°C</p>
            <p className="text-sm text-gray-600">Temperature</p>
          </div>
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-800">{weatherData.humidity}%</p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <Wind className="w-6 h-6 text-gray-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-800">{weatherData.windSpeed}</p>
            <p className="text-sm text-gray-600">Wind (km/h)</p>
          </div>
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <CloudRain className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-800">{weatherData.rainfall}</p>
            <p className="text-sm text-gray-600">Rainfall (mm)</p>
          </div>
        </div>

        {/* 4-Day Forecast */}
        <div className="grid grid-cols-4 gap-2">
          {forecast.map((day, index) => (
            <div key={index} className="text-center p-3 bg-white/60 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-1">{day.day}</p>
              <day.icon className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{day.temp}</p>
            </div>
          ))}
        </div>

        {/* Weather Alert */}
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Light rainfall expected tomorrow. Consider postponing pesticide application.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
