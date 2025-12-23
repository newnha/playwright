import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("E2E 테스트 예제", () => {
  test("홈페이지 접속 테스트", async ({ page }) => {
    const homePage = new HomePage(page);

    // 홈페이지로 이동
    await homePage.navigate();

    // 페이지 제목 확인
    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
  });

  test("검색 기능 테스트", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    // 검색 수행
    await homePage.search("Playwright");

    // 검색 결과 확인 (실제 사이트에 맞게 수정 필요)
    await expect(page).toHaveURL(/.*search.*/);
  });
});
