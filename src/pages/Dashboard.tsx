
import { usePoints } from "@/contexts/PointsContext";
import PageContainer from "@/components/layout/PageContainer";
import TaskList from "@/components/tasks/TaskList";
import RewardList from "@/components/rewards/RewardList";
import StatsCard from "@/components/stats/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalGambit from "@/components/features/PersonalGambit";
import SkillEvolution from "@/components/features/SkillEvolution";
import ComboChain from "@/components/features/ComboChain";
import TimeFlux from "@/components/features/TimeFlux";
import MomentumEngine from "@/components/features/MomentumEngine";

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
        
        <div className="mt-4">
          <Tabs defaultValue="gambit" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="gambit">Personal Gambit</TabsTrigger>
              <TabsTrigger value="evolution">Skill Evolution</TabsTrigger>
              <TabsTrigger value="combo">Combo Chain</TabsTrigger>
              <TabsTrigger value="timeflux">TimeFlux</TabsTrigger>
              <TabsTrigger value="momentum">Momentum Engine</TabsTrigger>
            </TabsList>
            <TabsContent value="gambit" className="mt-0">
              <PersonalGambit />
            </TabsContent>
            <TabsContent value="evolution" className="mt-0">
              <SkillEvolution />
            </TabsContent>
            <TabsContent value="combo" className="mt-0">
              <ComboChain />
            </TabsContent>
            <TabsContent value="timeflux" className="mt-0">
              <TimeFlux />
            </TabsContent>
            <TabsContent value="momentum" className="mt-0">
              <MomentumEngine />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
