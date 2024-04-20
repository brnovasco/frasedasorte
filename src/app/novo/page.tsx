"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { generateNumbers } from "@/lib/generate-numbers";
import { PlusIcon } from "lucide-react";

export default function Novo() {
  const [numbers, setNumbers] = useState<number[] | undefined>();
  const [frase, setFrase] = useState<string | undefined>();
  const [numerosAdicionais, setNumerosAdicionais] = useState<number>(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center m-auto w-1/3 border border-1 p-8 rounded-md">
        <h1 className="text-3xl font-bold m-8">
          Frase<span className="text-accent">DaSorte</span>
        </h1>
        <div className="items-center justify-center flex flex-col gap-2">
          <Input
            placeholder="Digite sua frase da sorte"
            onChange={(e) => setFrase(e.target.value)}
          />
          <div className="flex flex-row gap-2">
            <Button
              className="bg-accent text-white rounded-md p-2"
              onClick={() =>
                setNumbers(
                  generateNumbers({
                    frase: frase ?? "",
                    n: 6 + numerosAdicionais,
                    range: 60,
                  })
                )
              }
            >
              Gerar números
            </Button>
            <Button
              size={`icon`}
              className="bg-accent text-white rounded-md p-2"
              onClick={() => setNumerosAdicionais(numerosAdicionais + 1)}
            >
              <PlusIcon />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <p>Seus números da sorte são:</p>
            <div className="flex gap-2">
              {numbers?.map((number, index) => (
                <span key={`generated-${index}`}>{number}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
