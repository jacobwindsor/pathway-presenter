import presentations from './index';

jest.mock('./presentationsData', () => {
    return [
        {
            id: '1234',
            title: 'Test presentation',
            wpId: 'WP4',
            version: 0,
            description: 'A test presentation',
            slides: [
                {
                    id: '12345',
                    notes: '<p>This can be a normal string.</p><p>Alternatively we can do <strong>HTML</strong></p>',
                    targets: [
                        {
                            entityId: '12345',
                            hidden: false,
                            zoomed: false,
                            panned: true,
                            highlighted: true,
                            highlightedColor: 'red',
                            animateIn: true,
                            animateOut: true,
                            animateInDuration: 200,
                            animateOutDuration: 200,
                        }
                    ]
                },
            ]
        }
    ];
});

it('should resolve with the correct data', () => {
    return presentations.get('1234').then(presentation => {
        expect(presentation.id).toBe('1234');
        expect(presentation.title).toBe('Test presentation');
    })
});

it('should create a new presentation', () => {
    return presentations.create({
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
    }).then(res => expect(res).toBeDefined())
});

it('should update the presentation', () => {
    return presentations.update('1234', {
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
    }).then(res => expect(res).toBeDefined())
});