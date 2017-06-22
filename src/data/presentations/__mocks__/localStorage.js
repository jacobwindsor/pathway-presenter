import { cloneDeep } from 'lodash';
let localStorage = {};

export default {
    setItem(key, value) {
        return Object.assign(localStorage, {[key]: value});
    },
    getItem(key) {
        return localStorage[key];
    },
    removeItem(key) {
        const copy = cloneDeep(localStorage);
        delete copy[key];
        return copy;
    },
    clear() {
        localStorage = {};
    },
};