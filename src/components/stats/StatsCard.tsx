
import { UserStats } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, Check, Star, TrendingUp } from "lucide-react";

interface StatsCardProps {
  stats: UserStats;
}

const StatsCard = ({ stats }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-habit-yellow mr-2" />
              <h3 className="text-sm font-medium">Today</h3>
            </div>
            <p className="text-2xl font-bold">{stats.dailyPoints}</p>
            <p className="text-xs text-muted-foreground">Points earned</p>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-habit-purple mr-2" />
              <h3 className="text-sm font-medium">Total</h3>
            </div>
            <p className="text-2xl font-bold">{stats.totalPoints}</p>
            <p className="text-xs text-muted-foreground">All-time points</p>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-sm font-medium">Streak</h3>
            </div>
            <p className="text-2xl font-bold">{stats.streakDays}</p>
            <p className="text-xs text-muted-foreground">Consecutive days</p>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center mb-2">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-sm font-medium">Completed</h3>
            </div>
            <p className="text-2xl font-bold">{stats.tasksCompleted}</p>
            <p className="text-xs text-muted-foreground">Tasks finished</p>
          </div>
          
          {stats.topTask && (
            <div className="col-span-2 md:col-span-4 stat-card">
              <div className="flex items-center mb-2">
                <Award className="h-5 w-5 text-habit-orange mr-2" />
                <h3 className="text-sm font-medium">Top Achievement</h3>
              </div>
              <p className="text-lg font-medium">{stats.topTask}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
