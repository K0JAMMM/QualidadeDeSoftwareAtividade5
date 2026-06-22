//import { test, expect } from "@playwright/test";
//
//test.describe("API /posts", () => {
//
//  // ---------- Teste de API 6 (extra) ----------
//  test("GET /posts retorna lista paginada de posts", async ({ request }) => {
//    const response = await request.get("/posts", {
//      params: { limit: 5, skip: 0 },
//    });
//
//    expect(response.status()).toBe(200);
//
//    const body = await response.json();
//    expect(Array.isArray(body.posts)).toBe(true);
//    expect(body.posts.length).toBeLessThanOrEqual(5);
//
//    if (body.posts.length > 0) {
//      expect(body.posts[0]).toHaveProperty("id");
//      expect(body.posts[0]).toHaveProperty("title");
//    }
//  });
//
//  // ---------- Teste de API 7 (extra) ----------
//  test("GET /posts/liked sem userId retorna erro do cliente (4xx)", async ({ request }) => {
//    const response = await request.get("/posts/liked");
//
//    expect(response.status()).toBeGreaterThanOrEqual(400);
//    expect(response.status()).toBeLessThan(500);
//  });
//});
