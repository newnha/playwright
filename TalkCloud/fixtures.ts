import { test as base } from "@playwright/test";
import { HomePage } from "./pages/home/home.page";

/**
 * Custom fixtures - 페이지 객체를 테스트에서 직접 사용할 수 있도록 확장
 */
export const test = base.extend<{
  homePage: HomePage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
