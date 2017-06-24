import { cloneDeep } from 'lodash';
let localStorage = [];

export default {
    setItem(key, value) {
        localStorage = localStorage.concat([{
            key,
            value
        }]);
    },
    getItem(key) {
        const found =  localStorage
            .find(single => single.key === key);
        if (found)
            return found.value
    },
    removeItem(key) {
        const i = localStorage.findIndex(single => single.key === key);
        localStorage.pop(i);
    },
    clear() {
        localStorage = [];
    },
    key(i) {
        return localStorage[i].key
    }
};