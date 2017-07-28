describe('The editor interface', () => {
  it('can check tunnel working', function() {
    browser.driver.get('http://localhost:3000').then(function() {
      expect(browser.driver.getPageSource()).toMatch(/Up and running/i);
    });
  });
});
