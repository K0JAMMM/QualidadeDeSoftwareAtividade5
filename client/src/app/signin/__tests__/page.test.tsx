import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignInPage from "../page";
import { authService } from "@/service/auth/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("@/service/auth/auth", () => ({
  authService: {
    signIn: jest.fn(),
  },
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn(),
      user: null,
      logout: jest.fn(),
    });
  });

  it("deve autenticar usuário e redirecionar para a página principal", async () => {
    const loginMock = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
      user: null,
      logout: jest.fn(),
    });

    (authService.signIn as jest.Mock).mockResolvedValue({
      id: 1,
      email: "kaue@teste.com",
      password: "Senha@123",
    });

    render(<SignInPage />);

    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { value: "kaue@teste.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "Senha@123" },
    });

    const buttons = screen.getAllByRole("button", { name: "Entrar" });

    fireEvent.click(buttons[1]);

    await waitFor(() => {
      expect(authService.signIn).toHaveBeenCalledWith({
        email: "kaue@teste.com",
        password: "Senha@123",
      });
    });

    expect(loginMock).toHaveBeenCalledWith({
  id: 1,
  email: "kaue@teste.com",
});
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});