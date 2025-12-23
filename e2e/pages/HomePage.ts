import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - 홈 페이지 객체
 */
export class HomePage extends BasePage {
  // 페이지 요소들
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    // 요소 초기화
    this.searchInput = page.locator('input[name="q"]');
    this.searchButton = page.locator('button[type="submit"]');
  }

  /**
   * 홈페이지로 이동
   */
  async navigate(): Promise<void> {
    await this.goto('/');
  }

  /**
   * 검색 수행
   */
  async search(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }
}




