"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateNumbersByGameName } from "@/lib/generate-numbers";
import { CopyIcon, PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GAMES, type GameName } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [numbers, setNumbers] = useState<number[] | undefined>();
  const [phrase, setPhrase] = useState<string | undefined>();
  const [moreNumbers, setMoreNumbers] = useState<number>(0);
  const [gameName, setGameName] = useState<GameName | undefined>();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold my-4">
        Frase<span className="text-accent">DaSorte</span>
      </h1>
      <div
        className="items-center px-4 py-6 justify-center flex flex-col gap-2 w-5/6 lg:w-1/3"
        id="create-numbers"
      >
        <Textarea
          className="h-24"
          placeholder="Digite sua frase da sorte"
          onChange={(e) => {
            setPhrase(e.target.value);
            setNumbers(undefined);
          }}
        />
        <Select
          onValueChange={(value) => {
            setGameName(value as GameName);
            setNumbers(undefined);
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
            variant={`default`}
            className="p-2 gap-1"
            onClick={() => {
              setMoreNumbers(moreNumbers + 1);
              setNumbers(undefined);
            }}
          >
            <PlusIcon className="min-w-3" />
            {moreNumbers > 0 && <span className="text-sm">{moreNumbers}</span>}
          </Button>
          <Button
            variant={`default`}
            onClick={() => {
              if (phrase && gameName) {
                setNumbers(
                  generateNumbersByGameName({
                    phrase,
                    gameName,
                    moreNumbers,
                  })
                );
              }
            }}
            className="w-full"
          >
            Gerar números
          </Button>
        </div>
      </div>
      {numbers && (
        <div
          className="flex flex-col w-5/6 lg:w-1/3 p-4 items-center gap-2 my-4"
          id="generated-numbers"
        >
          <div className="flex flex-row gap-2">
            <h2 className="text-2xl font-semibold">
              Números<span className="text-accent">DaSorte</span>
            </h2>
          </div>
          <p className="text-md text-gray-500">
            {gameName} {moreNumbers > 0 ? `(+${moreNumbers})` : ""}
          </p>
          <p className="text-md text-gray-500 flex flex-wrap">{`"${phrase}"`}</p>
          <div className="flex flex-wrap gap-2 justify-between">
            {numbers.map((number, index) => (
              <div key={index} className="text-xl">
                {number}
              </div>
            ))}
            <Button
              variant={`ghost`}
              size={"icon"}
              className="size-4"
              onClick={() => {
                if (!numbers) return;
                const copyableText = `
                ${gameName} ${
                  moreNumbers > 0 ? `(+${moreNumbers})` : ""
                } - "${phrase}" - ${numbers.join(", ")}`;
                navigator.clipboard.writeText(copyableText);
              }}
            >
              <CopyIcon />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
