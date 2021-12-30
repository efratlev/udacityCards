import { getDecks } from "../utils/helpers"
import { recieveDecks } from "./decks"

export function handleInitialData(){
    return (dispatch)=> {
        return getDecks().then((decks)=> {
            dispatch(recieveDecks(decks))
        })
    } 
}