import {
    ENABLE_BUTTON,
    DISABLE_BUTTON
} from './types'

/**
 * desc: enable "Navigate" button on MemberList.js
 * @param {any} list 
 */
export const enableButton = (list) => {
    return {
        type: ENABLE_BUTTON,
        payload: list
    }
}

/**
 * desc: disable "Navigate" button on MemberList.js
 * @param {any} list 
 */
export const disableButton = (list) => {
    return {
        type: DISABLE_BUTTON,
        payload: list
    }
}