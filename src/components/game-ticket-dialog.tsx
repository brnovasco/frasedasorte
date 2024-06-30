import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedNumber } from "@/components/animated-button";
import { toast } from "sonner";
import { GameName, GAMES } from "@/lib/constants";
import { db } from "@/lib/db";

export type GameTicket = {
  generatedNumbers: number[];
  moreNumbers: number;
  phrase: string;
  gameName: GameName;
};

export function GameTicketDialog({
  ticket,
  open, 
  onOpenChange,
}: {
  ticket: GameTicket | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!ticket) {
    return null;
  }

  const { generatedNumbers, moreNumbers, phrase, gameName } = ticket;

  async function saveToDb() {
    toast.info("Salvando...");
    try {
      await db.games.add({
        gameName,
        moreNumbers,
        numbers: generatedNumbers,
        phrase,
        createdAt: new Date(),
      });
      toast.success("Salvo com sucesso!");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar!");
    }
  }

  const gameParams = GAMES.find((game) => game.name === gameName);

  if (!gameParams) {
    throw new Error(`Game ${gameName} not found`);
  }

  return (
    <Dialog open={open && !!ticket} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Números<span className="text-accent">DaSorte</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col items-center gap-2">
          <p className="text-lg text-gray-500">
            {gameName} {moreNumbers > 0 ? `(+${moreNumbers})` : ""}
          </p>
          <p className="text-lg text-gray-200 flex flex-wrap">{`"${phrase}"`}</p>
          <div className="flex text-accent flex-wrap gap-2 justify-between">
            {generatedNumbers.map((number, index) => (
              <div key={index} className="text-xl">
                {number}
              </div>
            ))}
            <Button
              variant={`ghost`}
              size={"icon"}
              className="size-4 text-gray-500"
              onClick={() => {
                const copyableText = `
                ${gameName} ${
                  moreNumbers > 0 ? `(+${moreNumbers})` : ""
                } - "${phrase}" - ${generatedNumbers.join(", ")}`;
                navigator.clipboard.writeText(copyableText);
              }}
            >
              <CopyIcon />
            </Button>
          </div>
          <GameNumbersGrid gameName={gameName} numbers={generatedNumbers} />
        </DialogDescription>
        <DialogFooter className="flex flex-row justify-between">
          <Button
            variant={`default`}
            className="bg-accent text-white"
            onClick={saveToDb}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function GameNumbersGrid({
  gameName,
  numbers,
}: {
  gameName: GameName;
  numbers: number[];
}) {
  const params = GAMES.find((game) => game.name === gameName);

  if (!params) {
    throw new Error(`Game ${gameName} not found`);
  }

  // all the numbers in the game range
  const Allnumbers = Array.from(
    { length: params.rangeMax - params.rangeMin + 1 },
    (_, index) => index + params.rangeMin
  );

  return (
    <ScrollArea className="w-full h-72">
      <div className="grid grid-cols-6">
        {Allnumbers.map((number) => (
          <AnimatedNumber
            key={number}
            value={number}
            marked={numbers.includes(number)}
            scale={0.8}
            className="text-xl"
          />
        ))}
      </div>
    </ScrollArea>
  );
}
