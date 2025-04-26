
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MomentumEngine = () => {
  const [studyProgress, setStudyProgress] = useState(2); // Hours completed out of 4
  const [gymProgress, setGymProgress] = useState(1); // Visits completed out of 3
  
  // Calculate points based on progress
  const studyPointsPerHour = [4, 5, 7, 10]; // Points increase as you get closer to goal
  const gymPointsPerVisit = [5, 7, 10]; // Points increase as you get closer to goal
  
  const studyPointsTotal = studyPointsPerHour.slice(0, studyProgress).reduce((a, b) => a + b, 0);
  const gymPointsTotal = gymPointsPerVisit.slice(0, gymProgress).reduce((a, b) => a + b, 0);
  
  const studyCompletionBonus = 5;
  const gymCompletionBonus = 15;
  
  const studyGoalPercent = (studyProgress / 4) * 100;
  const gymGoalPercent = (gymProgress / 3) * 100;

  return (
    <Card className="pixel-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Target className="h-5 w-5" />
          MOMENTUM ENGINE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm opacity-80">
          Rewards amplify as you advance:
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-primary font-mono">STUDY MOMENTUM ({studyProgress}/4 HOURS):</h3>
            <Progress value={studyGoalPercent} className="h-2 bg-muted" />
            <div className="grid grid-cols-4 gap-1 text-center text-sm">
              {studyPointsPerHour.map((points, i) => (
                <div key={i} className={`p-1 rounded ${i < studyProgress ? 'bg-primary/20 text-primary' : ''}`}>
                  {points}p
                </div>
              ))}
            </div>
            <div className="text-right text-sm">
              <span>Current: {studyPointsTotal} points</span>
              {studyProgress === 4 && (
                <span className="ml-2 text-primary">+{studyCompletionBonus} bonus!</span>
              )}
            </div>
          </div>
          
          <div className="border-t border-primary/30 pt-4 space-y-3">
            <h3 className="text-primary font-mono">TRAINING MOMENTUM ({gymProgress}/3 VISITS):</h3>
            <Progress value={gymGoalPercent} className="h-2 bg-muted" />
            <div className="grid grid-cols-3 gap-1 text-center text-sm">
              {gymPointsPerVisit.map((points, i) => (
                <div key={i} className={`p-1 rounded ${i < gymProgress ? 'bg-primary/20 text-primary' : ''}`}>
                  {points}p
                </div>
              ))}
            </div>
            <div className="text-right text-sm">
              <span>Current: {gymPointsTotal} points</span>
              {gymProgress === 3 && (
                <span className="ml-2 text-primary">+{gymCompletionBonus} bonus!</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MomentumEngine;
