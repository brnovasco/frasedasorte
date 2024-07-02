"use client";
import { useState } from "react";
import { generateNumbersByGameName } from "@/lib/generate-numbers";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GameTicketDialog,
  type GameTicket,
} from "@/components/game-ticket-dialog";
import { GAMES, type GameName } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [phrase, setPhrase] = useState<string | undefined>();
  const [moreNumbers, setMoreNumbers] = useState<number>(0);
  const [gameName, setGameName] = useState<GameName | undefined>();
  const [ticket, setTicket] = useState<GameTicket | undefined>();
  const [openDialog, setOpendialog] = useState(false);

  return (
    <main className="flex flex-col my-auto h-1/2 items-center justify-center">
      <GameTicketDialog
        ticket={ticket}
        open={openDialog}
        onOpenChange={() => {
          setOpendialog(!openDialog);
          setTicket(undefined);
        }}
      />
      <div
        className="items-center px-4 justify-center flex flex-col gap-2 w-5/6 lg:w-1/3"
        id="create-numbers"
      >
        <Textarea
          className="h-32 border-none text-2xl text-center shadow-none focus-visible:ring-transparent"
          placeholder="Digite sua frase da sorte aqui..."
          onChange={(e) => {
            setPhrase(e.target.value);
          }}
        />
        <Select
          onValueChange={(value) => {
            setGameName(value as GameName);
          }}
          value={gameName}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha o jogo" />
          </SelectTrigger>
          <SelectContent
            // prevents propagating touch events to the parent
            // https://github.com/shadcn-ui/ui/issues/486
            ref={(ref) => {
              if (!ref) return;
              ref.ontouchstart = (e) => e.preventDefault();
            }}
          >
            <SelectGroup>
              {GAMES.map((game) => (
                <SelectItem key={game.name} value={game.name}>
                  {game.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-row gap-2 w-full">
          <Button
            size={`icon`}
            variant={`secondary`}
            className="p-2 gap-1 text-white"
            onClick={() => {
              setMoreNumbers(moreNumbers + 1);
            }}
          >
            <PlusIcon className="min-w-3 max-w-4" />
            {moreNumbers > 0 && <span className="text-sm">{moreNumbers}</span>}
          </Button>
          <Button
            variant={`default`}
            className="bg-accent w-full p-2 text-white"
            onClick={() => {
              if (phrase && gameName) {
                const generatedNumbers = generateNumbersByGameName({
                  phrase,
                  gameName,
                  moreNumbers,
                });
                setTicket({
                  gameName,
                  moreNumbers,
                  generatedNumbers,
                  phrase,
                });
                setOpendialog(true);
              }
            }}
          >
            Gerar números
          </Button>

          <Button
            variant={"destructive"}
            size={`icon`}
            className="p-2"
            onClick={() => {
              setMoreNumbers(0);
            }}
          >
            <TrashIcon className="max-w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
