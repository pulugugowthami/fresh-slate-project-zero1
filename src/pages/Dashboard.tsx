
import { usePoints } from "@/contexts/PointsContext";
import PageContainer from "@/components/layout/PageContainer";
import TaskList from "@/components/tasks/TaskList";
import RewardList from "@/components/rewards/RewardList";
import StatsCard from "@/components/stats/StatsCard";

const Dashboard = () => {
  const { tasks, rewards, stats, completeTask, redeemReward } = usePoints();
  
  // Filter active tasks (not completed)
  const activeTasks = tasks.filter(task => !task.completed);

  return (
    <PageContainer>
      <div className="grid gap-6">
        <StatsCard stats={stats} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TaskList 
              tasks={activeTasks}
              title="Today's Quests"
              onCompleteTask={completeTask}
            />
          </div>
          <div>
            <RewardList 
              rewards={rewards}
              availablePoints={stats.pointsAvailable}
              onRedeemReward={redeemReward}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
