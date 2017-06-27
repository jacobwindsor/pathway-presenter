import { defaultsDeep, cloneDeep } from 'lodash/fp';
const uuidV4 = require('uuid/v4');

const list = () => {
    return new Promise(resolve => {
        const arr = [];
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i).startsWith('presentation')){
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }
        }
        resolve(arr);
    })
};

const get = (id) => {
    return new Promise(resolve => {
        const presentation = localStorage.getItem(`presentation-${id}`);
        if (! presentation) throw new Error(`No presentation with ID ${id} found.`);
        resolve(JSON.parse(presentation));
    })
};

const create = presentation => {
    // Todo: validate the input
    return new Promise(resolve => {
            const toSave = {
                id: uuidV4(),
                title: presentation.title,
                wpId: presentation.wpId,
                version: presentation.version,
                description: presentation.description,
                slides: presentation.slides.map(singleSlide => Object.assign({}, singleSlide, {id: uuidV4()}))
            };
            localStorage.setItem(`presentation-${toSave.id}`, JSON.stringify(toSave));
            resolve(toSave);
        }
    )
};

const update = (id, presentation) => {
    const copy = cloneDeep(presentation);

    return get(id)
        .then(toUpdate => cloneDeep(toUpdate))
        .then(toUpdate => {
            if(copy.slides) {
                // Allows for slides to be removed
                toUpdate.slides = copy.slides;
            }
            return toUpdate;
        })
        .then(toUpdate => defaultsDeep(toUpdate, copy))
        .then(toUpdate => {
            toUpdate.slides = toUpdate.slides.map(singleSlide => {
                if(! singleSlide.id) singleSlide.id = uuidV4();
                return singleSlide
            });
            return toUpdate
        })
        .then(updated => {
            localStorage.removeItem(`presentation-${updated.id}`);
            localStorage.setItem(`presentation-${updated.id}`, JSON.stringify(updated));
            return updated
        });
};

const remove = id => {
    return get(id)
        .then(() => {
            localStorage.removeItem(`presentation-${id}`);
        })
};

export default {
    list,
    get,
    create,
    update,
    remove,
}