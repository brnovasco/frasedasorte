"use client";
import { useState } from "react";
import { generateNumbersByGameName } from "@/lib/generate-numbers";
import { PlusIcon, PenIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectLabel,
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
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [phrase, setPhrase] = useState<string | undefined>();
  const [moreNumbers, setMoreNumbers] = useState<number>(0);
  const [gameName, setGameName] = useState<GameName | undefined>("mega-sena");
  const [ticket, setTicket] = useState<GameTicket | undefined>();
  const [openDialog, setOpendialog] = useState(false);

  return (
    <main className="px-4 w-5/6 lg:w-1/3 h-full">
      <GameTicketDialog
        ticket={ticket}
        open={openDialog}
        onOpenChange={() => {
          setOpendialog(!openDialog);
          setTicket(undefined);
        }}
      />
      <div className="grid grid-rows-[1fr_auto] h-full">
        <div className="grow my-auto w-full items-center justify-center">
          <Label htmlFor="input-frase" className="sr-only">
            Clique para digitar ou colar sua frase da sorte
          </Label>
          <Label
            htmlFor="input-frase"
            className="mb-2 flex flex-row w-full justify-center"
          >
            <PenIcon />
          </Label>
          <Textarea
            id="input-frase"
            className="border-none grow min-h-52 text-2xl text-center shadow-none focus-visible:ring-transparent"
            placeholder={"Digite sua frase da sorte aqui..."}
            onChange={(e) => {
              setPhrase(e.target.value);
              if (moreNumbers > 0) setMoreNumbers(0);
            }}
          />
        </div>
        <footer className="flex flex-none w-full h-fit mt-auto mb-10 px-4 items-end justify-center gap-1">
          <Select
            onValueChange={(value) => {
              setGameName(value as GameName);
            }}
            value={gameName}
          >
            <SelectTrigger
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "h-12 w-28"
              )}
            >
              <SelectValue placeholder="Escolha o jogo" />
            </SelectTrigger>
            <SelectContent
              className="bg-secondary"
              // prevents propagating touch events to the parent
              // https://github.com/shadcn-ui/ui/issues/486
              ref={(ref) => {
                if (!ref) return;
                ref.ontouchstart = (e) => e.preventDefault();
                // reset the add numbers value
                setMoreNumbers(0);
              }}
            >
              <SelectGroup>
                <SelectLabel className="text-primary-foreground">
                  Escolha o tipo de jogo
                </SelectLabel>
                {GAMES.map((game) => (
                  <SelectItem key={game.name} value={game.name}>
                    {game.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label htmlFor="add-more-numbers" className="sr-only">
            Clique para adicionar mais números ao jogo do que a quantidade
            padrão
          </Label>
          <Button
            id={"add-more-numbers"}
            variant={`secondary`}
            className="p-2 gap-1 h-12"
            onClick={() => {
              setMoreNumbers(moreNumbers + 1);
            }}
          >
            <PlusIcon className="min-w-3 max-w-4" />
            {moreNumbers > 0 && <span className="text-sm">{moreNumbers}</span>}
          </Button>
          <Label htmlFor="generate-numbers" className="sr-only">
            Clique para gerar os números da sorte
          </Label>
          <Button
            id={"generate-numbers"}
            variant={`default`}
            className="bg-accent h-12 w-28 p-2 text-white"
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
        </footer>
      </div>
    </main>
  );
}
