import { test, expect } from "@playwright/test";
import { uniqueEmail, VALID_PASSWORD, INVALID_PASSWORD } from "../utils/data";

test.describe("API /auth", () => {

  // ---------- Teste de API 1 ----------
  test("POST /auth/signup cria usuário com dados válidos (200)", async ({ request }) => {
    const email = uniqueEmail("signup-ok");

    const response = await request.post("/auth/signup", {
      data: { email, password: VALID_PASSWORD },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("id");
    expect(body.email).toBe(email);
  });

  // ---------- Teste de API 2 ----------
  test("POST /auth/signup com e-mail duplicado retorna 409", async ({ request }) => {
    const email = uniqueEmail("dup");

    const first = await request.post("/auth/signup", {
      data: { email, password: VALID_PASSWORD },
    });
    expect(first.status()).toBe(200);

    const second = await request.post("/auth/signup", {
      data: { email, password: VALID_PASSWORD },
    });

    expect(second.status()).toBe(409);
    const body = await second.json();
    expect(body.message).toContain("já está em uso");
  });

  // ---------- Teste de API 3 ----------
  test("POST /auth/signup com senha inválida retorna 422", async ({ request }) => {
    const response = await request.post("/auth/signup", {
      data: { email: uniqueEmail("weakpass"), password: INVALID_PASSWORD },
    });

    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.message).toBe("Senha inválida");
  });

  // ---------- Teste de API 4 ----------
  test("POST /auth/signin com credenciais válidas retorna 200", async ({ request }) => {
    const email = uniqueEmail("signin-ok");

    const signup = await request.post("/auth/signup", {
      data: { email, password: VALID_PASSWORD },
    });
    expect(signup.status()).toBe(200);

    const signin = await request.post("/auth/signin", {
      data: { email, password: VALID_PASSWORD },
    });

    expect(signin.status()).toBe(200);
    const body = await signin.json();
    expect(body.email).toBe(email);
    expect(body).toHaveProperty("id");
    
  });
});
