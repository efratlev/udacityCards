//import { saveQuestion, saveQuestionAnswer } from "../utils/_DATA"

export const RECIEVE_DECKS = "RECIEVE_DECKS"
export const CREATE_DECK = "CREATE_DECK"

export function recieveDecks(decks){
    return{
        type: RECIEVE_DECKS,
        decks,
    }
}

export function createDeck(deck){
    return{
        type: CREATE_DECK,
        deck,
    }
}