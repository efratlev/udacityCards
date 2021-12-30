import {combineReducers} from 'redux'
import { RECIEVE_DECKS, CREATE_DECK } from "../actions/decks";
import { CREATE_CARD } from "../actions/cards";

function decks(state={}, action){
    switch(action.type){
        case RECIEVE_DECKS:
            return{
                ...state,
                ...action.decks
            }
        case CREATE_DECK:
            return{                
                ...state,
                [action.deck.title]:action.deck
            }
        case CREATE_CARD:
            return{                
                ...state,
                [action.card.deckId]:{
                  ...state[action.card.deckId],
                  questions:state[action.card.deckId].questions.concat([action.card.question])
                }
            }
        default:
            return state
    }
}

//export default decks

export default combineReducers({
    decks,    
})