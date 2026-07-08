import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Price Watcher heading", () => {
  render(<App />);
  const heading = screen.getByText(/Price Watcher/i);
  expect(heading).toBeInTheDocument();
});
