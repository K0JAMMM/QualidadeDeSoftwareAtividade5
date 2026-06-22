import { test, expect } from "@playwright/test";

test("usuário não autenticado é avisado ao tentar curtir", async ({ page }) => {
  await page.goto("/");

  const firstPost = page.getByRole("listitem").first();
  await expect(firstPost).toBeVisible({ timeout: 15000 });

  let dialogMessage = "";
  page.once("dialog", async (dialog) => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });

  await firstPost.getByRole("button", { name: /Curtir/ }).click();

  await expect.poll(() => dialogMessage).toContain("autenticado");
});
