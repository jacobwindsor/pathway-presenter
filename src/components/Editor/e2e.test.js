describe('The editor interface', () => {
  it('can create a presentation via the Adder form', () => {
    browser.url('http://localhost:3000');

    expect(browser.isExisting('.adder-wrapper')).to.be.true;
    expect(browser.isExisting('.creator-wrapper')).to.be.false;

    browser.setValue('[name="title"]', 'Test title');
    browser.setValue('[name="authorName"]', 'Tester');
    browser.setValue('[name="wpId"]', 'WP4');
    browser.setValue('[name="version"]', '0');
    browser.click('.create-button');

    expect(browser.isExisting('.creator-wrapper')).to.be.true;
  });

  it('can skip the onboarding tutorial', () => {
    // Just here for convenience. Don't need to test onboarding since it's an external library
    browser.click('.joyride-tooltip__button.joyride-tooltip__button--skip');
  });

  it('can add a slide', () => {
    browser.click('.add-slide-button');
    expect(browser.elements('.static-slide').value).to.have.lengthOf(2);
  });

  it('can open up the action panel by clicking a node', () => {
    expect(browser.isExisting('#editor-panel-controls')).to.be.false;
    // Dangerous! This selector is part of the external Pvjs library and may be subject to change
    browser.click('g#pvjs-infobox');
    expect(browser.isExisting('#editor-panel-controls')).to.be.true;
  });

  it('can highlight the info box', () => {
    expect(browser.isExisting('#highlight-red-toggle')).to.be.false;
    browser.click('#highlight-toggle');
    expect(browser.isExisting('#highlight-red-toggle')).to.be.true;
    browser.click('#highlight-red-toggle');
    browser.click('.add-target-button');

    // Only test whether the chip is added, not whether the node is actually red. That's down to Pvjs
    expect(browser.elements('.target-chip').value).to.have.lengthOf(1);
  });

  it('can hide a node', () => {
    browser.click('g#da9a8'); // Dangerous!
    browser.click('#hide-toggle');
    browser.click('.add-target-button');

    expect(browser.elements('.target-chip').value).to.have.lengthOf(2);
  });

  it('can delete the action', () => {
    // The only svg element in the chip is the delete cross
    browser.click('.target-chip svg'); // Will only click the first one
    expect(browser.elements('.target-chip').value).to.have.lengthOf(1);
  });

  it('can lock the pan/zoom state', () => {
    // Just for convenience and previews
    browser.click('#slide-lock');
  });

  it('can delete a slide', () => {
    browser.click('.static-slide .remove-button');
    expect(browser.elements('.static-slide').value).to.have.lengthOf(1);
  });

  it('shows the warning dialog when trying to present before saving', () => {
    browser.click('#present-button');
    expect(browser.alertText()).to.not.be.null;
    browser.alertDismiss();
  });

  it('shows the warning when trying to navigate away without saving', () => {
    browser.refresh();
    expect(browser.alertText()).to.not.be.null;
    browser.alertDismiss();
  });

  it('saves', () => {
    browser.click('#save-button');
  });

  it('opens a new tab when the present button is clicked', () => {
    browser.click('#present-button');
    expect(browser.getTabIds()).to.have.lengthOf(2);
  });
});
