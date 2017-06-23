import { defaultsDeep } from 'lodash/fp';
const uuidV4 = require('uuid/v4');

class Presentations {
    get(id) {
        return new Promise(resolve => {
            const presentation = localStorage.getItem(`presentation-${id}`);
            if (! presentation) throw new Error(`No presentation with ID ${id} found.`);
            resolve(JSON.parse(presentation));
        })
    }

    create(presentation) {
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
    }

    update(id, presentation) {
        return this.get(id)
            .then(toUpdate => defaultsDeep(toUpdate, presentation))
            .then(updated => {
                localStorage.removeItem(`presentation-${updated.id}`);
                localStorage.setItem(`presentation-${updated.id}`, JSON.stringify(updated));
                return updated
            });
    }

    remove(id) {
        return this.get(id)
            .then(toRemove => localStorage.removeItem(`presentation-${id}`))
    }
}

export default new Presentations();