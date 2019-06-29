import { SET_KEYS } from '../actions/actionTypes'

const initialState = {
    keys: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_KEYS:
            return {
                ...state,
                keys: action.keys
            }
        default:
            return state
    }
}

export default reducer