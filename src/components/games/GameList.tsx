
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad, PuzzlePiece, Brain, Star } from "lucide-react";

interface Game {
  id: string;
  name: string;
  type: string;
  description: string;
  points: number;
}

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (data) setGames(data);
    };
    fetchGames();
  }, []);

  const handlePlayGame = async (game: Game) => {
    // Logic to start game session
    const { data, error } = await supabase.from('game_sessions').insert({
      game_id: game.id,
      score: 0,
      completed: false
    });
    setSelectedGame(game);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad /> Game Center
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game.id} className="border rounded-lg p-4 hover:bg-accent/10 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{game.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                {game.points} pts
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
            <Button 
              onClick={() => handlePlayGame(game)} 
              className="w-full"
              variant="outline"
            >
              Play Now
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GameList;
