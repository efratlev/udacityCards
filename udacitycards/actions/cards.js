//import { saveQuestion, saveQuestionAnswer } from "../utils/_DATA"

export const CREATE_CARD = "CREATE_CARD"

export function createCard(card){
    return{
        type: CREATE_CARD,
        card,
    }
}