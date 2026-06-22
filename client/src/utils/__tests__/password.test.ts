import { isPasswordValid } from "../password";

describe("utils/password", () => {
  it("deve aceitar senha forte com exatamente 8 caracteres", () => {
    expect(isPasswordValid("Senha@12")).toBe(true);
  });
});
