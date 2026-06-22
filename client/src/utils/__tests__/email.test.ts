import { getEmailValidationMessage, isEmailValid } from "../email";

describe("utils/email", () => {
  it("deve validar e-mail correto e rejeitar e-mail inválido", () => {
    expect(isEmailValid("kaue@teste.com")).toBe(true);
    expect(isEmailValid("kaue-sem-arroba.com")).toBe(false);
    expect(getEmailValidationMessage("kaue-sem-arroba.com")).toBe("Email inválido");
  });
});
