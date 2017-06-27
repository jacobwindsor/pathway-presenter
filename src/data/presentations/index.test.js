import presentations from './index';
import { cloneDeep } from 'lodash';
require('jest-localstorage-mock');

describe('The presentation data service', () => {
    afterEach(() => {
        localStorage.clear();
    });

    it('should have no data when initialized', () => {
        expect(localStorage).toHaveLength(0);
        return presentations.get('1234').catch(err => expect(err.message).toEqual('No presentation with ID 1234 found.'));
    });

    it('should create a new presentation', () => {
        const presentation = {
            title: 'A title',
            description: 'A description',
            wpId: 'WP4',
            version: 0,
            authorName: 'Bruce Lee',
            slides: [{
                title: 'A slide',
                targets: [],
            }, {
                title: 'A second slide',
                targets: [],
            }],
        };

        return presentations.create(presentation).then(res => {
            expect(res).toBeDefined();
            expect(res.id).toBeDefined();
            expect(res.slides[0].id).toBeDefined();
            expect(res.slides[0]).toHaveProperty('id');
            expect(res.slides[1]).toHaveProperty('id');
            expect(res.slides[0].id).not.toEqual(res.slides[1].id);
        });
    });

    it('should only update the wpId', () => {
        return presentations.create({title: 'A title', wpId: 'WP4', slides: []})
            .then(pres => presentations.update(pres.id, {wpId: 'WP4'}))
            .then(res => {
                expect(res).toBeDefined();
                expect(res.wpId).toEqual('WP4');
                expect(res.title).toEqual('A title');
                expect(res.slides).toHaveLength(0);
            });
    });

    it('should assign an id to the new slides', () => {
        return presentations.create({title: 'A title', wpId: 'WP4', slides: []})
            .then(pres => presentations.update(pres.id, {slides: [
                {title: 'A slide', targets: []},
                {title: 'A second slide', targets: []}
            ]}))
            .then(res => {
                expect(res).toBeDefined();
                expect(res.wpId).toEqual('WP4');
                expect(res.title).toEqual('A title');
                expect(res.slides).toHaveLength(2);
                expect(res.slides[0].id).toBeDefined();
                expect(res.slides[1].id).toBeDefined();
                expect(res.slides[0].id).not.toEqual(res.slides[1].id)
            });
    });
    
    it('should list the presentations', () => {
        return presentations.create({title: 'A pres', wpId:'WP4', version: 0, slides:[]})
            .then(pres => presentations.list().then(theList => {
                expect(theList).toEqual([pres])
            }));
    });

    it('should remove the presentation', () => {
        return presentations.create({title: 'A pres', wpId:'WP4', version: 0, slides:[]})
            .then(pres => presentations.remove(pres.id))
            .then(() => expect(localStorage).toHaveLength(0))
    });

    it('should remove the slide', () => {
        return presentations.create({title: 'A pres', wpId: 'WP4', version: 0,
            slides: [{title: 'First', targets: []}, {title: 'second', targets: []}]})
            .then(pres => {
                const copy = cloneDeep(pres);
                copy.slides = copy.slides.slice(0, 1);
                return presentations.update(pres.id, copy);
            })
            .then(updated => {
                expect(updated.slides).toHaveLength(1);
            })
    })
});