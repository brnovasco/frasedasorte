export type GameName = 'mega-sena' | 'quina' | 'lotofácil' | 'lotomania' | 'dupla-sena' | 'timemania' | 'dia-de-sorte';
type GameBase = {
    name: GameName;
    listDefaultSize: number;
    rangeMin: number;
    rangeMax: number;
};

export const GAMES: GameBase[] = [
    {
        name: 'mega-sena',
        listDefaultSize: 6,
        rangeMin: 1,
        rangeMax: 60,
    },
    {
        name: 'quina',
        listDefaultSize: 5,
        rangeMin: 1,
        rangeMax: 80,
    },
    {
        name: 'lotofácil',
        listDefaultSize: 15,
        rangeMin: 1,
        rangeMax: 25,
    },
    {
        name: 'lotomania',
        listDefaultSize: 50,
        rangeMin: 0,
        rangeMax: 99,
    },
    {
        name: 'dupla-sena',
        listDefaultSize: 6,
        rangeMin: 1,
        rangeMax: 50,
    },
    {
        name: 'timemania',
        listDefaultSize: 7,
        rangeMin: 1,
        rangeMax: 80,
    },
    {
        name: 'dia-de-sorte',
        listDefaultSize: 7,
        rangeMin: 1,
        rangeMax: 31,
    },
];