import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import marvelReducer from './reducers/marvel'
import keysReducer from './reducers/keys'

const rootReducer = combineReducers({
    marvel: marvelReducer,
    keys: keysReducer
})

const storeConfig = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)))
}

export default storeConfig