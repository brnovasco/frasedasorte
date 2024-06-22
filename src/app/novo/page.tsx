"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { generateNumbersByGameName } from "@/lib/generate-numbers";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GAMES, type GameName } from "@/lib/constants";

export default function Novo() {
  const [numbers, setNumbers] = useState<number[] | undefined>();
  const [frase, setFrase] = useState<string | undefined>();
  const [numerosAdicionais, setNumerosAdicionais] = useState<number>(0);
  const [gameName, setGameName] = useState<GameName | undefined>();

  const handleGenerateNumbers = useCallback(() => {
    if (gameName) {
      setNumbers(
        generateNumbersByGameName({
          frase: frase || "",
          gameName: gameName || "",
          additionalNumbers: numerosAdicionais,
        })
      );
    }
  }, [frase, gameName, numerosAdicionais]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold my-4">
        Frase<span className="text-accent">DaSorte</span>
      </h1>
      <div
        className="items-center px-4 py-6 justify-center flex flex-col gap-2 w-5/6 lg:w-1/3 border border-1 rounded-md"
        id="create-numbers"
      >
        <Input
          placeholder="Digite sua frase da sorte"
          onChange={(e) => setFrase(e.target.value)}
        />
        <div className="flex flex-row gap-2 w-full">
          <GameSelect gameName={gameName} setGameName={setGameName} />
          <Button variant={`default`} onClick={handleGenerateNumbers}>
            Gerar números
          </Button>
          <Button
            size={`icon`}
            variant={`default`}
            className="p-2 gap-1"
            onClick={() => {
              setNumerosAdicionais(numerosAdicionais + 1);
              handleGenerateNumbers();
            }}
          >
            <PlusIcon className="min-w-3" />
            {numerosAdicionais > 0 && (
              <span className="text-sm">{numerosAdicionais}</span>
            )}
          </Button>
        </div>
      </div>
      {numbers && (
        <div
          className="flex flex-col w-5/6 lg:w-1/3 p-4 items-center gap-2"
          id="generated-numbers"
        >
          <h2 className="text-xl font-semibold">Números gerados</h2>
          <div className="flex flex-wrap gap-2 justify-between">
            {numbers.map((number, index) => (
              <div key={index} className="text-xl">
                {number}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <div className="flex flex-col w-5/6 lg:w-1/3 p-4 items-center gap-2" id="generated-numbers">
        <h2 className="text-xl font-semibold">Números gerados</h2>
        <div className="flex flex-wrap gap-2 justify-between">
          {numbers?.map((number, index) => (
            <div key={index} className="text-xl">
              {number}
            </div>
          ))}
        </div>
      </div> */}
    </main>
  );
}

function GameSelect({
  gameName,
  setGameName,
}: {
  gameName: GameName | undefined;
  setGameName: (gameName: GameName) => void;
}) {
  return (
    <Select
      onValueChange={(value) => setGameName(value as GameName)}
      value={gameName}
    >
      <SelectTrigger>
        <SelectValue placeholder="Escolha o jogo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {GAMES.map((game) => (
            <SelectItem key={game.name} value={game.name}>
              {game.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
