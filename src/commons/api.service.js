/**
 * API Service
 * 
 * This service responsible for serving
 * the API Request methods
 * 
 * © David Mahbubi
 */

import Vue from 'vue';
import { API_BASE_URL } from '@/commons/config';
import { makeLog } from './logger.service';
import { getToken } from '@/commons/token.service';

const setAuth = () => {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${getToken() || ''}`;
}

const apiService = {

    /**
     * initial function
     */
    init() {
        Vue.axios.defaults.headers.common['Accept'] = 'application/json';
    },

    /**
     * get request method
     * 
     * @param {*} resource 
     * @param {*} slug 
     */
    get(resource, slug = '') {
        return Vue.axios.get(`${API_BASE_URL}/${resource}/${slug}`).catch((error) => {
            makeLog('SERVICE', error, true, true);
            throw new Error(error);
        });
    },

    /**
     * get request method using params
     * 
     * @param {*} resource 
     * @param {*} params 
     */
    query(resource, params = '') {
        return Vue.axios.get(`${API_BASE_URL}/${resource}`, params).catch((error) => {
            makeLog('SERVICE', error, true, true);
            throw new Error(error);
        });
    },

    /**
     * post request method
     * 
     * @param {*} resource 
     * @param {*} params 
     */
    post(resource, params = '') {
        return Vue.axios.post(`${API_BASE_URL}/${resource}`, params).catch((error) => {
            makeLog('SERVICE', error, true, true);
            throw new Error(error);
        });
    },

    /**
     * postMedia with post request method
     * 
     * This method is for sending media(s) through
     * HTTP Request with POST method
     * 
     * @param {*} resource 
     * @param {*} params 
     */
    postMedia(resource, params) {
        return Vue.axios.post(`${API_BASE_URL}/${resource}`, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).catch((error) => {
            throw new Error(error);
        })
    },

    /**
     * patch request method
     * 
     * @param {*} resource 
     * @param {*} params 
     */
    patch(resource, params = {}) {
        return Vue.axios.patch(`${API_BASE_URL}/${resource}`, params).catch((error) => {
            makeLog('SERVICE', error, true, true);
            throw new Error(error);
        })
    },

}

const auth = {

    /**
     * post request method for auth
     * 
     * @param {*} slug 
     * @param {*} params 
     */
    post(slug, params) {
        return apiService.post(`auth/${slug}`, params);
    },

    /**
     * get request method for auth
     * 
     * @param {*} slug 
     */
    get(slug = '') {
        return apiService.get(`auth/${slug}`);
    } 
}

const question = {
    /**
     * get request method for question
     * 
     * @param {*} slug 
     */
    get(slug = '') {
        return apiService.get(`question/${slug}`);
    },
}

const quiz = {
    /**
     * post request method for qui
     * 
     * @param {*} slug 
     */
    post(slug = '', params) {
        return apiService.post(`quiz/${slug}`, params);
    },
}

const level = {
    /**
     * get request method for level
     * 
     * @param {*} slug 
     */
    get(slug = '') {
        return apiService.get(`level/${slug}`);
    }
}

const settings = {
    /**
     * patch request method for settings
     * 
     * @param {*} slug 
     * @param {*} params 
     */
    patch(slug = '', params) {
        return apiService.patch(`user/update/${slug}`, params);
    },
    /**
     * post request method for settings
     * 
     * @param {*} slug 
     * @param {*} params 
     */
    postMedia(slug = '', params) {
        return apiService.postMedia(`user/update/${slug}`, params);
    }
}

export {
    auth,
    quiz,
    level,
    setAuth,
    settings,
    question,
    apiService,
}
