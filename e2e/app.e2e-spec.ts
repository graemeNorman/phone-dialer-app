import { PhoneDialPage } from './app.po';

describe('phone-dial App', () => {
  let page: PhoneDialPage;

  beforeEach(() => {
    page = new PhoneDialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
