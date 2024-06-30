"use client";
import Image from "next/image";
import { useLiveQuery } from "dexie-react-hooks";
import { CopyIcon, TrashIcon } from "lucide-react";
import { db, type GameStored } from "@/lib/db";

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
      <h1 className="text-2xl text-center">Frases Salvas</h1>
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
    await db.games
      .delete(game.id)
      .finally(() => {
        toast.success("Jogo deletado com sucesso!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao deletar jogo!");
      });
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>
          {gameName}{moreNumbers > 0 ? ` (+${moreNumbers}) -` : " - "}{createdAt.toLocaleDateString()}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col !py-0">
        <CardDescription>{`Frase: "${phrase}"`}</CardDescription>
        <CardDescription>{numbers.join(", ")}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end mt-0">
        <Button
          variant={"ghost"}
          size={"icon"}
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
        <Button variant={"ghost"} size={"icon"} onClick={deleteGame}>
          <TrashIcon className="max-w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
