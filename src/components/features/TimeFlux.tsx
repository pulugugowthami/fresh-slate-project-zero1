
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const TimeFlux = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState<string>("");
  
  useEffect(() => {
    // Update the current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    // Get user's timezone
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    
    return () => clearInterval(timer);
  }, []);
  
  const getHour = () => currentTime.getHours();
  
  const getStudyPoints = () => {
    const hour = getHour();
    if (hour >= 8 && hour < 11) return 6; // Morning
    if (hour >= 14 && hour < 16) return 4; // Afternoon
    if (hour >= 22 || hour < 5) return 2; // Late night
    return 3; // Default
  };
  
  const getEntertainmentCost = () => {
    const hour = getHour();
    if (hour >= 20 || hour < 8) return 15; // Evening/night
    return 10; // Day
  };
  
  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="pixel-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Clock className="h-5 w-5" />
          TIMEFLUX SYSTEM
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm opacity-80">
            Current time dynamics:
          </div>
          <div className="text-primary font-mono">
            {formatTime()}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-primary font-mono">FOCUS EFFICIENCY:</h3>
            <div className="space-y-1 pl-2 text-sm">
              <p>8-11 AM: <span className={getHour() >= 8 && getHour() < 11 ? "text-primary font-medium" : ""}>6 points/hour</span></p>
              <p>2-4 PM: <span className={getHour() >= 14 && getHour() < 16 ? "text-primary font-medium" : ""}>4 points/hour</span></p>
              <p>After 10 PM: <span className={getHour() >= 22 ? "text-primary font-medium" : ""}>2 points/hour</span></p>
              <div className="bg-primary/10 p-2 rounded mt-1 font-medium">
                Current rate: {getStudyPoints()} points/hour
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary/30 pt-4 space-y-1">
            <h3 className="text-primary font-mono">LEISURE COSTS:</h3>
            <div className="space-y-1 pl-2 text-sm">
              <p>Digital content before 8 PM: <span className={getHour() < 20 ? "text-primary font-medium" : ""}>10 points</span></p>
              <p>Digital content after 8 PM: <span className={getHour() >= 20 ? "text-primary font-medium" : ""}>15 points</span></p>
              <p>Gaming progression: +2 points/hour</p>
              <div className="bg-primary/10 p-2 rounded mt-1 font-medium">
                Current leisure cost: {getEntertainmentCost()} points
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeFlux;
