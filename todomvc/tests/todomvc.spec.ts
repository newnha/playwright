// Playwright의 기본 테스트 객체와 expect를 import
import { test, expect } from "@playwright/test";

// describe는 테스트들을 하나의 그룹으로 묶어주는 역할
// TodoMVC의 CRUD 테스트들을 하나로 묶는다
test.describe("TodoMVC CRUD Test", () => {
  // beforeEach는 각 test가 실행되기 전에 항상 실행됨
  // 즉, 매 테스트마다 사이트에 새로 접속
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
  });

  // ========================
  // 1️⃣ CREATE 테스트
  // ========================
  test("Create Todo", async ({ page }) => {
    // placeholder로 input 찾기
    const input = page.getByPlaceholder("What needs to be done?");

    // 할 일 입력
    await input.fill("Study Playwright");

    // Enter 키 입력
    await input.press("Enter");

    // 화면에 방금 추가한 텍스트가 보이는지 검증
    await expect(page.getByText("Study Playwright")).toBeVisible();
  });

  // ========================
  // 2️⃣ UPDATE (완료 체크)
  // ========================
  test("Complete Todo", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");

    // 먼저 todo를 하나 생성
    await input.fill("Complete me");
    await input.press("Enter");

    // 체크박스 선택
    const checkbox = page.locator(".toggle").first();
    await checkbox.check();

    // completed 클래스가 생겼는지 확인
    await expect(page.locator(".completed")).toBeVisible();
  });

  // ========================
  // 3️⃣ DELETE 테스트
  // ========================
  test("Delete Todo", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");

    await input.fill("Delete me");
    await input.press("Enter");

    // 해당 todo 항목에 hover 해야 X 버튼이 나타남
    const todo = page.locator(".todo-list li").first();
    await todo.hover();

    // 삭제 버튼 클릭
    await page.locator(".destroy").click();

    // 해당 텍스트가 더 이상 존재하지 않는지 검증
    await expect(page.getByText("Delete me")).toHaveCount(0);
  });
});

// Todo 필터 기능을 하나의 그룹으로 묶음
test.describe("Todo Filters", () => {
  // 각 테스트 실행 전에 공통으로 실행되는 부분
  test.beforeEach(async ({ page }) => {
    // 1️⃣ TodoMVC 사이트 접속
    await page.goto("https://demo.playwright.dev/todomvc/#/");

    const input = page.getByPlaceholder("What needs to be done?");

    // 2️⃣ Active 상태로 남겨둘 Todo 생성
    await input.fill("Active Todo");
    await input.press("Enter");

    // 3️⃣ Completed 상태로 만들 Todo 생성
    await input.fill("Completed Todo");
    await input.press("Enter");

    // 4️⃣ 두 번째 Todo를 완료 상태로 변경
    //    → Completed 필터 테스트를 위해 상태 세팅
    await page.locator(".todo-list li").nth(1).getByRole("checkbox").check();
  });

  // ==============================
  // All 필터 테스트
  // ==============================
  test("All 필터", async ({ page }) => {
    // 1️⃣ All 필터 클릭
    await page.getByRole("link", { name: "All" }).click();

    // 2️⃣ 전체 Todo가 모두 보여야 함 (2개)
    await expect(page.locator(".todo-list li")).toHaveCount(2);
  });

  // ==============================
  // Active 필터 테스트
  // ==============================
  test("Active 필터", async ({ page }) => {
    // 1️⃣ Active 필터 클릭
    await page.getByRole("link", { name: "Active" }).click();

    const todos = page.locator(".todo-list li");

    // 2️⃣ 완료되지 않은 Todo만 보여야 함 (1개)
    await expect(todos).toHaveCount(1);

    // 3️⃣ 해당 Todo가 Active Todo인지 검증
    await expect(todos.first()).toHaveText(/Active Todo/);
  });

  // ==============================
  // Completed 필터 테스트
  // ==============================
  test("Completed 필터", async ({ page }) => {
    // 1️⃣ Completed 필터 클릭
    await page.getByRole("link", { name: "Completed" }).click();

    const todos = page.locator(".todo-list li");

    // 2️⃣ 완료된 Todo만 보여야 함 (1개)
    await expect(todos).toHaveCount(1);

    // 3️⃣ 해당 Todo가 Completed Todo인지 검증
    await expect(todos.first()).toHaveText(/Completed Todo/);
  });
});
