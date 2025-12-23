import { chromium, FullConfig } from "@playwright/test";
import { AuthPage } from "./pages/auth/auth.page";
import * as path from "path";

/**
 * Global Setup - 로그인 상태를 저장하여 재사용
 * 이 파일은 모든 테스트 실행 전에 한 번만 실행됩니다.
 */
async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const email = process.env.TALKCLOUD_EMAIL;
  const password = process.env.TALKCLOUD_PASSWORD;

  if (!email || !password) {
    console.warn("⚠️  TALKCLOUD_EMAIL 또는 TALKCLOUD_PASSWORD가 설정되지 않았습니다.");
    console.warn("   로컬: .env 파일에 설정하세요");
    console.warn("   CI: GitHub Secrets에 설정하세요");
    return;
  }

  // 브라우저 실행
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 로그인 수행
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login(email, password);

    // 로그인 상태 저장
    const storageStatePath = path.join(__dirname, "../playwright/.auth/user.json");
    await context.storageState({ path: storageStatePath });
    console.log("✅ 로그인 상태가 저장되었습니다:", storageStatePath);
  } catch (error) {
    console.error("❌ 로그인 실패:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;

