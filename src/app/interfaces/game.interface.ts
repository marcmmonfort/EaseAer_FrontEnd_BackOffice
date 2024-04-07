export interface Game {
    uuid?: string;
    idUserGame: string;
    destinationGame: string;
    questionsGame: [string];
    pointsGame: number;
    deletedGame: boolean;
    createdAt: string;
    updatedAt: string;
}