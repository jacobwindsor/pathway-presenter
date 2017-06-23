import presentations from './index';
import localStorage from './__mocks__/localStorage';
window.localStorage = localStorage;

describe('The presentation data service', () => {
    let presentation;
    beforeAll(() => {
       presentation = {
           wpId: 'WP4',
           title: 'A title',
           version: 0,
           description: 'A description',
           slides: [{
               title: 'A slide title',
               notes: 'A note',
               targets: [{
                   entityId: '1234',
                   hidden: false,
                   highlighted: true,
                   highlightedColor: 'blue',
                   panned: true,
                   zoomed: true,
               }]
           }]
       };
    });

    afterAll(() => {
       localStorage.clear();
    });

    it('should have no data when initialized', () => {
        return presentations.get('1234').catch(err => expect(err.message).toEqual('No presentation with ID 1234 found.'));
    });

    it('should create a new presentation', () => {
        return presentations.create(presentation).then(res => {
            expect(res).toBeDefined();
            expect(res.id).toBeDefined();
            expect(res.slides[0].id).toBeDefined();
            presentation = res;
        });
    });

    it('should resolve with the newly created presentation', () => {
        return presentations.get(presentation.id).then(presentation => {
            expect(presentation).toEqual(presentation)
        })
    });

    it('should create a completely new presentation', (() => {
        return presentations.create(presentation)
            .then(newPres => expect(presentation.id).not.toEqual(newPres.id));
    }));

    it('Every slide should have a unique ID', () => {
        presentation = Object.assign({}, presentation, {
            slides: presentation.slides.concat([{
                title: 'a second slide',
                targets: [],
            }])
        });

        return presentations.create(presentation)
            .then(newPres => {
                const slides = newPres.slides;
                expect(slides[0]).toHaveProperty('id');
                expect(slides[1]).toHaveProperty('id');
                expect(slides[0].id).not.toEqual(slides[1].id);
                presentation = newPres;
            })
    });

    it('should only update the wpId', () => {
        return presentations.update(presentation.id, {
            wpId: 'WP5',
        }).then(res => {
            expect(res).toBeDefined();
            expect(res.wpId).toEqual('WP5');
            expect(res).toEqual(Object.assign({}, presentation, {wpId: 'WP5'}));
            presentation = res;
        })
    });

    it('should update the wpId and the title', () => {
       return presentations.update(presentation.id, {
           wpId: 'WP6',
           title: 'A title 2'
       }).then(res => {
           expect(res).toBeDefined();
           expect(res.wpId).toEqual('WP6');
           expect(res.title).toEqual('A title 2');
           expect(res).toEqual(Object.assign({}, presentation, {wpId: 'WP6', title: 'A title 2'}));
       })
    });
});