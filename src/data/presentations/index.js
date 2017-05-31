import presentationData from './presentationsData';
import { find } from 'lodash/fp';

export default {
    get: (id) => {
        return new Promise(resolve => {
            const presentation = find(singlePresentation => singlePresentation.id === id)(presentationData);
            if (! presentation) throw new Error(`No presentation with ID ${id} found!`);
            resolve(presentation);
        })
    }
}