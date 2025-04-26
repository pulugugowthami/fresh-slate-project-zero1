
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SkillEvolution = () => {
  // Simulated player stats
  const skillLevels = {
    endurance: 3,
    focus: 2,
    strength: 4,
  };

  const getRequirements = (level: number) => {
    return {
      pushups: 10 + (level * 2),
      focusMinutes: 15 + (level * 5),
      walkingMinutes: 10 + (level * 3),
    };
  };

  return (
    <Card className="pixel-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <TrendingUp className="h-5 w-5" />
          SKILL EVOLUTION SYSTEM
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm opacity-80">
          Challenge scales with your growth:
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <h3 className="text-primary font-mono">ENDURANCE LVL {skillLevels.endurance}</h3>
              <span className="text-xs font-mono">{skillLevels.endurance}/10</span>
            </div>
            <Progress value={skillLevels.endurance * 10} className="h-2 bg-muted" />
            <div className="space-y-1 pl-2 text-sm">
              <p><span className="font-mono text-primary">CURRENT:</span> {getRequirements(skillLevels.endurance).pushups} pushups = 5 points</p>
              <p><span className="font-mono text-primary">NEXT LVL:</span> {getRequirements(skillLevels.endurance + 1).pushups} pushups = 5 points</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <h3 className="text-primary font-mono">FOCUS LVL {skillLevels.focus}</h3>
              <span className="text-xs font-mono">{skillLevels.focus}/10</span>
            </div>
            <Progress value={skillLevels.focus * 10} className="h-2 bg-muted" />
            <div className="space-y-1 pl-2 text-sm">
              <p><span className="font-mono text-primary">CURRENT:</span> {getRequirements(skillLevels.focus).focusMinutes}min focus = 4 points</p>
              <p><span className="font-mono text-primary">NEXT LVL:</span> {getRequirements(skillLevels.focus + 1).focusMinutes}min focus = 4 points</p>
            </div>
          </div>
          
          <div className="border-t border-primary/30 pt-4 space-y-1">
            <p className="text-primary font-mono">SKILL DECAY:</p>
            <p className="text-sm">Requirements adjust if inactive for 3+ days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillEvolution;
