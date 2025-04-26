
import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Task, Reward, PointRecord, UserStats } from "@/types/types";
import { initialTasks, initialRewards, initialStats } from "@/data/initialData";

interface PointsState {
  tasks: Task[];
  rewards: Reward[];
  pointHistory: PointRecord[];
  stats: UserStats;
}

type PointsAction =
  | { type: "COMPLETE_TASK"; taskId: string }
  | { type: "ADD_TASK"; task: Omit<Task, "id" | "completed" | "createdAt"> & { id?: string } }
  | { type: "REDEEM_REWARD"; rewardId: string }
  | { type: "ADD_REWARD"; reward: Omit<Reward, "id"> & { id?: string } }
  | { type: "LOAD_STATE"; state: PointsState };

interface PointsContextType {
  tasks: Task[];
  rewards: Reward[];
  pointHistory: PointRecord[];
  stats: UserStats;
  completeTask: (taskId: string) => void;
  addTask: (title: string, points: number, category: Task["category"]) => void;
  redeemReward: (rewardId: string) => void;
  addReward: (title: string, cost: number, description: string, category: Reward["category"]) => void;
}

const PointsContext = createContext<PointsContextType | null>(null);

const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const reducer = (state: PointsState, action: PointsAction): PointsState => {
  switch (action.type) {
    case "COMPLETE_TASK": {
      const taskToComplete = state.tasks.find(task => task.id === action.taskId);
      if (!taskToComplete || taskToComplete.completed) return state;

      const updatedTasks = state.tasks.map(task => 
        task.id === action.taskId ? { ...task, completed: true } : task
      );

      const newPointRecord: PointRecord = {
        id: generateId(),
        amount: taskToComplete.points,
        source: taskToComplete.title,
        date: new Date(),
        type: "earned"
      };

      const updatedHistory = [...state.pointHistory, newPointRecord];

      const updatedStats: UserStats = {
        ...state.stats,
        dailyPoints: state.stats.dailyPoints + taskToComplete.points,
        totalPoints: state.stats.totalPoints + taskToComplete.points,
        pointsAvailable: state.stats.pointsAvailable + taskToComplete.points,
        tasksCompleted: state.stats.tasksCompleted + 1,
        topTask: state.stats.topTask === "" || taskToComplete.points > (state.tasks.find(t => t.title === state.stats.topTask)?.points || 0) 
          ? taskToComplete.title 
          : state.stats.topTask,
      };

      return { 
        ...state, 
        tasks: updatedTasks,
        pointHistory: updatedHistory,
        stats: updatedStats
      };
    }

    case "ADD_TASK": {
      const newTask: Task = {
        id: action.task.id || generateId(),
        title: action.task.title,
        points: action.task.points,
        category: action.task.category,
        completed: false,
        createdAt: new Date()
      };

      return { 
        ...state, 
        tasks: [...state.tasks, newTask] 
      };
    }

    case "REDEEM_REWARD": {
      const rewardToRedeem = state.rewards.find(reward => reward.id === action.rewardId);
      if (!rewardToRedeem || state.stats.pointsAvailable < rewardToRedeem.cost) return state;

      const newPointRecord: PointRecord = {
        id: generateId(),
        amount: rewardToRedeem.cost,
        source: rewardToRedeem.title,
        date: new Date(),
        type: "spent"
      };

      const updatedHistory = [...state.pointHistory, newPointRecord];

      const updatedStats: UserStats = {
        ...state.stats,
        pointsSpent: state.stats.pointsSpent + rewardToRedeem.cost,
        pointsAvailable: state.stats.pointsAvailable - rewardToRedeem.cost,
      };

      return { 
        ...state, 
        pointHistory: updatedHistory,
        stats: updatedStats
      };
    }

    case "ADD_REWARD": {
      const newReward: Reward = {
        id: action.reward.id || generateId(),
        title: action.reward.title,
        cost: action.reward.cost,
        description: action.reward.description,
        category: action.reward.category
      };

      return { 
        ...state, 
        rewards: [...state.rewards, newReward] 
      };
    }

    case "LOAD_STATE": {
      return action.state;
    }

    default:
      return state;
  }
};

const initialState: PointsState = {
  tasks: initialTasks,
  rewards: initialRewards,
  pointHistory: [],
  stats: initialStats
};

export const PointsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Load from localStorage on mount
    const savedState = localStorage.getItem("pointsSystem");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Convert date strings back to Date objects
        parsedState.pointHistory = parsedState.pointHistory.map((record: any) => ({
          ...record,
          date: new Date(record.date)
        }));
        parsedState.tasks = parsedState.tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
        
        dispatch({ type: "LOAD_STATE", state: parsedState });
      } catch (error) {
        console.error("Error loading saved state:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever state changes
    localStorage.setItem("pointsSystem", JSON.stringify(state));
  }, [state]);

  const completeTask = (taskId: string) => {
    dispatch({ type: "COMPLETE_TASK", taskId });
  };

  const addTask = (title: string, points: number, category: Task["category"]) => {
    dispatch({ type: "ADD_TASK", task: { title, points, category } });
  };

  const redeemReward = (rewardId: string) => {
    dispatch({ type: "REDEEM_REWARD", rewardId });
  };

  const addReward = (title: string, cost: number, description: string, category: Reward["category"]) => {
    dispatch({ type: "ADD_REWARD", reward: { title, cost, description, category } });
  };

  return (
    <PointsContext.Provider
      value={{
        tasks: state.tasks,
        rewards: state.rewards,
        pointHistory: state.pointHistory,
        stats: state.stats,
        completeTask,
        addTask,
        redeemReward,
        addReward
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
};
