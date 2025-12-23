import { Page, Locator } from "@playwright/test";

/**
 * AuthPage - TalkCloud 로그인 페이지 객체
 */
export class AuthPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // TalkCloud 로그인 페이지의 실제 요소에 맞게 수정 필요
    this.emailInput = page.locator('input[type="email"]').or(page.locator('input[name="email"]'));
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole("button", { name: /로그인|Login/i });
  }

  /**
   * 로그인 페이지로 이동
   */
  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  /**
   * 로그인 수행
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // 로그인 완료 대기
    await this.page.waitForURL(/\/home/, { timeout: 10000 });
  }
}

