import rerollEnemies from '../logic/rerollEnemies'
import {
    START_GAME, 
    END_GAME,
    SET_CAN_ATTACK,
    GAME_WON,
    GAME_LOST,
    ITEM_OBTAINED,
    GENERATE_CLASSIC_ENEMIES,
    LOAD_STATE
} from '../actions/types'

const initialState = {
    classicEnemies: [],
    battleStatus: '',
    canAttack: true,
    generatedItems: null,
    gameTimer: 1000,
}

export default (state = initialState, action) => {
    switch(action.type) {

        // Start Game
        case START_GAME:
            return {
                ...state,
                battleStatus: 'inBattle',
                canAttack: true,
                generatedItems: null
            }

        // End Game
        case END_GAME:
            return {
                ...state,
                battleStatus: '',
                generatedItems: null
            }

        // Set Attack
        case SET_CAN_ATTACK:
            return {
                ...state,
                canAttack: action.payload
            }

        // Game Won
        case GAME_WON:
            return {
                ...state,
                battleStatus: 'Victory',
            }

        // Game Lost
        case GAME_LOST:
            return {
                ...state,
                battleStatus: 'Defeat'
            }

        // Items Obtained
        case ITEM_OBTAINED:
            return {
                ...state,
                generatedItems: action.payload
            }

        // Generate Classic Enemies
        case GENERATE_CLASSIC_ENEMIES:

            return {
                ...state,
                classicEnemies: rerollEnemies(action.payload)
            }

        // Load State
        case LOAD_STATE:
            return action.payload.game

        // Default
        default:
            return state
    }
}