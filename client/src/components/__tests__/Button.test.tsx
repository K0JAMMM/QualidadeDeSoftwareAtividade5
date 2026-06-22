import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("deve exibir Carregando quando isLoading for verdadeiro", () => {
    render(<Button isLoading>Salvar</Button>);

    expect(screen.getByRole("button", { name: /carregando/i })).toBeInTheDocument();
  });
});
