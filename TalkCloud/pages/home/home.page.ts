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
      name: "신용카드",
      exact: true,
    });
  }

  /**
   * TalkCloud 홈페이지로 이동
   */
  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  /**
   * '신용카드' 링크가 보이는지 확인
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
