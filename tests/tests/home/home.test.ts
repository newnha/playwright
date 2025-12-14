import { test, expect } from "../../fixtures";

test.describe("Home", () => {
  test("뱅크샐러드 페이지 접속 테스트", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.creditCardLink).toBeVisible();
  });
});
