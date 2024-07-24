import { CopyIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
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

  function handleCopy() {
    navigator.clipboard.writeText(generatedNumbers.join(", "));
  }

  function handleShare() {
    const gameUrl = "https://frasedasorte.vercel.app/";
    const copyableText = `
    ${gameName} ${
      moreNumbers > 0 ? `(+${moreNumbers})` : ""
    } - "${phrase}" - ${generatedNumbers.join(
      ", "
    )} - faça a sua frase em: ${gameUrl}`;
    navigator.clipboard.writeText(copyableText);
  }

  const gameParams = GAMES.find((game) => game.name === gameName);

  if (!gameParams) {
    throw new Error(`Game ${gameName} not found`);
  }

  // show only the first 15 numbers if the list is too long
  const numberListVisible = generatedNumbers.slice(0, 15);

  return (
    <Dialog open={open && !!ticket} onOpenChange={onOpenChange}>
      <DialogContent className="w-5/6 lg:w-1/3 flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Números<span className="text-accent">DaSorte</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col items-center gap-2">
          <p className="text-lg text-gray-800">
            {gameName} {moreNumbers > 0 ? `(+${moreNumbers})` : ""}
          </p>
          <p className="text-lg text-gray-500 flex flex-wrap">{`"${phrase}"`}</p>
          <div className="flex text-accent flex-wrap gap-1 justify-between">
            {numberListVisible.map((number, index) => (
              <span key={index} className="text-xl">
                {number}
                {index < numberListVisible.length - 1 ? "," : ""}
              </span>
            ))}
            {generatedNumbers.length > 15 && (
              <span className="text-xl mx-1">...</span>
            )}
            <Button
              variant={`ghost`}
              size={"icon"}
              className="size-4 text-gray-500 hover:bg-current"
              onClick={handleCopy}
            >
              <CopyIcon />
            </Button>
          </div>
          <GameNumbersGrid gameName={gameName} numbers={generatedNumbers} />
        </DialogDescription>
        <DialogFooter className="flex flex-row justify-center items-center gap-2 mt-4">
          <Button
            variant={`default`}
            className="bg-accent text-white w-1/2"
            onClick={saveToDb}
          >
            Salvar
            <DownloadIcon className="ml-2 h-4" />
          </Button>
          <Button
            variant={`default`}
            className="bg-green-800 text-white w-1/2"
            onClick={handleShare}
          >
            Compartilhar
            <ExternalLinkIcon className="ml-2 h-4" />
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
  //if there is a number 0, place it at the end of the array
  if (Allnumbers.includes(0)) {
    Allnumbers.splice(Allnumbers.indexOf(0), 1);
    Allnumbers.push(0);
  }

  return (
    <ScrollArea className="w-full h-fit">
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
