import { LOAD_MARVEL, LOADING_CHARACTERS, CHARACTERS_LOADED, SET_CHARACTER, LOAD_COMICS } from './actionTypes'

import axios from 'axios'
import md5 from 'js-md5'

const loadMarvel = (marvelCharacters, page) => {
    return {
        type: LOAD_MARVEL,
        marvelCharacters: marvelCharacters,
        page: page,
    }
}

const loadingCharacters = () => {
    return {
        type: LOADING_CHARACTERS
    }
}

const charactersLoaded = () => {
    return {
        type: CHARACTERS_LOADED
    }
}

const loadCharacter = (currentCharacter) => {
    return {
        type: SET_CHARACTER,
        currentCharacter: currentCharacter,
    }
}

const loadComics = (comics) => {
    return {
        type: LOAD_COMICS,
        comics: comics,
    }
}

export const setCharacter = (currentCharacter) => {
    return async dispatch => {
        dispatch(loadCharacter(currentCharacter))
    }
}



export const getCharacters = (page, keys) => {

    return async dispatch => {

        if (keys.length <= 0) {
            dispatch(loadMarvel([], page))
            return
        }

        dispatch(loadingCharacters())

        const public_key = keys.public_key
        const private_key = keys.private_key

        let offset = 0

        offset = page === 1 ? 0 : page * 10

        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + private_key + public_key)
        //console.log('hash', hash)

        await axios.get(`https://gateway.marvel.com/v1/public/characters`, {
            params: {
                apikey: public_key,
                ts: timestamp,
                hash: hash.hex(),
                limit: 10,
                offset: offset
            }
        })
            .then(res => {
                const marvelCharacters = res.data
                //console.log('marvelCharacters: ', marvelCharacters.data.results)
                dispatch(loadMarvel(marvelCharacters, page))
                dispatch(charactersLoaded())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getComics = (id, offset, keys) => {

    id = typeof id === 'undefined' ? 1 : id

    return async dispatch => {

        if (keys.length <= 0) {
            dispatch(loadComics([]))
            return
        }
        
        dispatch(loadingCharacters())

        // const public_key = '5f305f42bfce9996a79d639b4ec331f6'
        // const private_key = '72cd034af528721b4deae6aeb01239bec8661fe3'

        const public_key = keys.public_key
        const private_key = keys.private_key

        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + private_key + public_key)
        //console.log('hash', hash)

        await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}/comics`, {
            params: {
                apikey: public_key,
                ts: timestamp,
                hash: hash.hex(),
                limit: 20,
                offset: offset
            }
        })
            .then(res => {
                const comics = res.data
                //console.log('marvelCharacters: ', marvelCharacters.data.results)
                dispatch(loadComics(comics))
                dispatch(charactersLoaded())
            })
            .catch(err => {
                console.log(err)
            })
    }
}
