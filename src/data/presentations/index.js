import { defaultsDeep } from 'lodash/fp';
const uuidV4 = require('uuid/v4');

export default {
    get: (id) => {
        return new Promise(resolve => {
            const presentation = localStorage.getItem(`presentation-${id}`);
            if (! presentation) throw new Error(`No presentation with ID ${id} found.`);
            resolve(JSON.parse(presentation));
        })
    },
    create: (presentation) => {
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
    },
    update: (id, presentation) => {
        return new Promise(resolve => {
            const toUpdate = localStorage.getItem(`presentation-${id}`);
            if (! toUpdate) throw new Error(`Presentation with ID ${id} not found.`);

            const toSave = defaultsDeep(toUpdate, presentation);
            localStorage.removeItem(`presentation-${id}`);
            localStorage.setItem(`presentation-${id}`, toSave);
            resolve(toSave);
        });
    }
}