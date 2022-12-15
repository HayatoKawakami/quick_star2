import { render, screen } from "@testing-library/react";
import { UserNew } from "./components/pages/users/new";

test("Appの中にhayatoの文字が存在する", ()=>{
  render(<UserNew />);
  const text = screen.getByText("hayato");
  expect(text).toBeInTheDocument();
})