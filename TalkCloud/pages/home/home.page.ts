import { Page, Locator } from "@playwright/test";

/**
 * HomePage - TalkCloud 홈페이지 객체
 */
export class HomePage {
  readonly page: Page;
  readonly creditCardLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.creditCardLink = page.getByRole("link", {
      name: "톡클라우드",
      exact: true,
    });
  }

  /**
   * TalkCloud 홈페이지로 이동
   */
  async goto(): Promise<void> {
    await this.page.goto("/home");
  }

  /**
   * '카카오톡 데이터' 메뉴명이 보이는지 확인
   */
  async checkCreditCardLinkVisible(): Promise<boolean> {
    try {
      await this.creditCardLink.waitFor({ state: "visible", timeout: 5000 });
      return await this.creditCardLink.isVisible();
    } catch {
      return false;
    }
  }
}
