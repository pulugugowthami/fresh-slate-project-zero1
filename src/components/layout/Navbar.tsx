
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl bg-gradient-to-br from-habit-purple to-habit-darkpurple bg-clip-text text-transparent">
            LifeQuest
          </Link>
          <Link to="/" className="text-foreground/60 hover:text-foreground">Dashboard</Link>
          <Link to="/stats" className="text-foreground/60 hover:text-foreground">Stats</Link>
          <Link to="/history" className="text-foreground/60 hover:text-foreground">History</Link>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
