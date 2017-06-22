import presentationData from './presentationsData';
import { find, defaultsDeep } from 'lodash/fp';
const uuidV4 = require('uuid/v4');

export default {
    get: (id) => {
        return new Promise(resolve => {
            const presentation = find(singlePresentation => singlePresentation.id === id)(presentationData);
            if (! presentation) throw new Error(`No presentation with ID ${id} found!`);
            resolve(presentation);
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
                localStorage.setItem(`presentation-${toSave.id}`, toSave);
                resolve();
            }
        )
    },
    update: (id, presentation) => {
        return new Promise(resolve => {
            const toUpdate = localStorage.getItem(`presentation-${id}`);
            if (! toUpdate) throw new Error(`Presentation with ID ${id} not found.`);

            const toSave = defaultsDeep(presentation, toUpdate);
            localStorage.removeItem(`presentation-${id}`);
            localStorage.setItem(`presentation-${id}`, toSave);
            resolve();
        });
    }
}