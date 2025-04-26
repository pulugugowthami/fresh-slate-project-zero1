
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Instagram, Twitter, Clock } from "lucide-react";
import { toast } from "sonner";

const PLATFORMS = [
  { name: 'YouTube', icon: Youtube },
  { name: 'Instagram', icon: Instagram },
  { name: 'Twitter', icon: Twitter }
];

const SocialTracker: React.FC = () => {
  const [trackingPlatform, setTrackingPlatform] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const startTracking = (platform: string) => {
    setTrackingPlatform(platform);
    // Start a timer
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 60000); // increment every minute
  };

  const stopTracking = async () => {
    if (!trackingPlatform) return;

    try {
      const { data, error } = await supabase.from('social_tracking').insert({
        platform: trackingPlatform,
        duration: duration
      });

      toast.success(`Tracked ${duration} minutes on ${trackingPlatform}`, {
        description: "Your social media usage has been logged."
      });

      setTrackingPlatform(null);
      setDuration(0);
    } catch (error) {
      toast.error("Failed to log social media usage");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock /> Social Media Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!trackingPlatform ? (
          <div className="grid grid-cols-3 gap-4">
            {PLATFORMS.map(({ name, icon: Icon }) => (
              <Button 
                key={name}
                variant="outline" 
                className="flex flex-col h-24"
                onClick={() => startTracking(name)}
              >
                <Icon className="h-8 w-8 mb-2" />
                {name}
              </Button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">
              Tracking {trackingPlatform}
            </p>
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 mr-2" />
              <span className="text-3xl">{duration} mins</span>
            </div>
            <Button onClick={stopTracking} variant="destructive">
              Stop Tracking
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialTracker;
