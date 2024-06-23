"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import { generateNumbersByGameName } from "@/lib/generate-numbers";
import { CopyIcon, PlusIcon, Trash, TrashIcon } from "lucide-react";
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
import { toast } from "sonner";

export default function Home() {
  const [numbers, setNumbers] = useState<number[] | undefined>();
  const [phrase, setPhrase] = useState<string | undefined>();
  const [moreNumbers, setMoreNumbers] = useState<number>(0);
  const [gameName, setGameName] = useState<GameName | undefined>();

  async function saveToDb() {
    if (!numbers) return;
    if (!gameName) return;
    if (!phrase) return;
    toast.info("Salvando...");
    try {
      await db.games.add({
        gameName,
        moreNumbers,
        numbers,
        phrase,
        createdAt: new Date(),
      });
      toast.success("Salvo com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar!");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full h-24 flex flex-col items-center justify-center mx-auto my-4">
        <Image
          src={"/icon_transparent.png"}
          alt="Fase da Sorte"
          layout="intrinsic"
          width={100}
          height={100}
        />
      </div>
      <div className="w-full h-24 flex flex-col items-center justify-center mx-auto my-4">
        <Image
          src={"/banner-transparent.png"}
          alt="Fase da Sorte"
          layout="intrinsic"
          width={300}
          height={100}
        />
      </div>
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
            variant={`secondary`}
            className="p-2 gap-1"
            onClick={() => {
              setMoreNumbers(moreNumbers + 1);
              setNumbers(undefined);
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
                setNumbers(
                  generateNumbersByGameName({
                    phrase,
                    gameName,
                    moreNumbers,
                  })
                );
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
              setNumbers(undefined);
              setMoreNumbers(0);
            }}
          >
            <TrashIcon className="max-w-4" />
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
              className="size-4 text-gray-500"
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
          <Button
            variant={`default`}
            className="bg-accent text-white"
            onClick={saveToDb}
          >
            Salvar
          </Button>
        </div>
      )}
    </main>
  );
}
