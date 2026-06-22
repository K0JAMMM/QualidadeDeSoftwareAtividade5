import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "../Input";

describe("Input", () => {
  it("deve renderizar label, input e mensagem de erro", () => {
    render(<Input label="Email" error="Email inválido" placeholder="seu@email.com" />);

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
  });
});
