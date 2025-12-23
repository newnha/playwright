import { Page } from "@playwright/test";

/**
 * BasePage - 모든 페이지 객체의 기본 클래스
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * 페이지로 이동
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * 페이지 제목 가져오기
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * URL 가져오기
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * 요소가 보일 때까지 대기
   */
  async waitForElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: "visible" });
  }
}
