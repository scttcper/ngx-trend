import { NgxTrendPage } from './app.po';

describe('ngx-trend App', () => {
  let page: NgxTrendPage;

  beforeEach(() => {
    page = new NgxTrendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
