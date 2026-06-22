export function uniqueEmail(prefix = "user"): string {
  const stamp = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return `${prefix}+${stamp}@teste.com`;
}

export const VALID_PASSWORD = "Senha@123";

export const INVALID_PASSWORD = "abc";
