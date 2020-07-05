import { AppPage } from './app.po';

describe('home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should check footer presentation on home page', () => {
    page.navigateTo();
    expect(page.isFooterPresent()).toBeTruthy('<app-footer> should exist in footer.component.html');
  });


});
