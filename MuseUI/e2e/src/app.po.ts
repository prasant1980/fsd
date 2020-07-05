import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AppPage {
  
  getFooter(): ElementFinder {
    return element(by.css('app-footer'));
  }

  isFooterPresent(): promise.Promise<boolean> {
    return this.getFooter().isPresent();
  }
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root ')).getText() as Promise<string>;
  }
}
