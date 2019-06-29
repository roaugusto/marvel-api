import { LOAD_MARVEL, LOADING_CHARACTERS, CHARACTERS_LOADED, SET_CHARACTER, LOAD_COMICS } from '../actions/actionTypes'

const initialState = {
    marvelCharacters: [],
    page: 0,
    isLoading: false,
    currentCharacter: [],
    comics: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MARVEL:
            return {
                ...state,
                marvelCharacters: action.marvelCharacters,
                page: action.page
            }
        case LOADING_CHARACTERS:
            return {
                ...state,
                isLoading: true
            }
        case CHARACTERS_LOADED:
            return {
                ...state,
                isLoading: false
            }
        case SET_CHARACTER:
            return {
                ...state,
                currentCharacter: action.currentCharacter
            }
        case LOAD_COMICS:
            return {
                ...state,
                comics: action.comics,
            }
        default:
            return state
    }
}

export default reducer