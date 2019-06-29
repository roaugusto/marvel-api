import { SET_KEYS } from './actionTypes'

const loadKeys = (keys) => {
    return {
        type: SET_KEYS,
        keys: keys,
    }
}

export const setKeys = (public_key, private_key) => {
    return async dispatch => {

        const keys = {
            public_key: public_key,
            private_key: private_key
        }

        dispatch(loadKeys(keys))
    }
}
