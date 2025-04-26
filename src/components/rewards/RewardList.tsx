
import { Reward } from "@/types/types";
import RewardItem from "./RewardItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RewardListProps {
  rewards: Reward[];
  availablePoints: number;
  onRedeemReward: (rewardId: string) => void;
}

const RewardList = ({ rewards, availablePoints, onRedeemReward }: RewardListProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
          {rewards.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground col-span-full">
              No rewards available
            </div>
          ) : (
            rewards.map((reward) => (
              <RewardItem
                key={reward.id}
                reward={reward}
                availablePoints={availablePoints}
                onRedeem={onRedeemReward}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardList;
