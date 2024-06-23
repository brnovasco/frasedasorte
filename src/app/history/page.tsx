"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { db, type GameStored } from "@/lib/db";
import { CopyIcon, TrashIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function HistoryPage() {
  const games = useLiveQuery(() => db.games.toArray(), []);

  console.log(games);
  return (
    <div>
      <h1>History</h1>
      <p>This is the history page.</p>
      <div>
        {games?.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

// a card component for viewing one GameStored item from the db
function GameCard({ game }: { game: GameStored }) {
  const { gameName, moreNumbers, numbers, phrase, createdAt } = game;

  async function deleteGame() {
    console.log("deleting game", game.id);
    await db.games.delete(game.id);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{gameName}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{phrase}</CardDescription>
        <CardDescription>{createdAt.toLocaleDateString()}</CardDescription>
        <CardDescription>{numbers}</CardDescription>
        <CardDescription>{moreNumbers}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            const copyableText = `
                ${gameName} ${
              moreNumbers > 0 ? `(+${moreNumbers})` : ""
            } - "${phrase}" - ${numbers.join(", ")}`;
            navigator.clipboard.writeText(copyableText);
          }}
        >
          <CopyIcon className="max-w-4" />
        </Button>
        <Button onClick={deleteGame}>
          <TrashIcon className="max-w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
