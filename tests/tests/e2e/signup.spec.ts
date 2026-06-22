import { test, expect } from "@playwright/test";
import { uniqueEmail, VALID_PASSWORD } from "../utils/data";

test("usuário consegue se cadastrar e é levado ao feed", async ({ page }) => {
  await page.goto("/signup");

  await expect(page.getByRole("heading", { name: "Criar Conta" })).toBeVisible();

  await page.getByPlaceholder("seu@email.com").fill(uniqueEmail("e2e-signup"));

  const passwordFields = page.getByPlaceholder("••••••••");
  await passwordFields.nth(0).fill(VALID_PASSWORD); // Senha
  await passwordFields.nth(1).fill(VALID_PASSWORD); // Confirmar Senha

  await page.locator("form").getByRole("button", { name: "Criar Conta" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: "Feed de Posts" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Sair" })).toBeVisible();
});
