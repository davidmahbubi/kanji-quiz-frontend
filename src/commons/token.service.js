/**
 * Token Service
 * 
 * This service is responsible to manage
 * token inside of browser's localStorage
 * 
 * © David Mahbubi
 */

const TOKEN_KEY = 'apiToken';

/**
 * setToken
 * 
 * This method will save token into localStorage
 * 
 * @param {*} token 
 */
const setToken = token => {
    window.localStorage.setItem(TOKEN_KEY, token);
}

/**
 * getToken
 * 
 * This method will retrieve token from localStorage
 */
const getToken = () => {
    return window.localStorage.getItem(TOKEN_KEY);
}

/**
 * purgeToken
 * 
 * This method will purge token from localStorage
 */
const purgeToken = () => {
    window.localStorage.removeItem(TOKEN_KEY);
}

export {
    setToken,
    getToken,
    purgeToken,
}
