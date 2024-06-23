// db.ts
import Dexie, { type EntityTable } from "dexie";
import type { GameName } from "./constants";

interface GameStored {
  id: number;
  gameName: GameName;
  moreNumbers: number;
  numbers: number[];
  phrase: string;
  createdAt: Date;
}

const db = new Dexie("GameHistoryDb") as Dexie & {
  games: EntityTable<
    GameStored,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  games: "++id, gameName, moreNumbers, numbers, phrase, createdAt",
});

export type { GameStored };
export { db };
