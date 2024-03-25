import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { expect, test } from "vitest";
import '@testing-library/jest-dom/vitest';

test("renders header", () => {
    render(<App />);
    const header = screen.getByText(/My To Do list/i);
    expect(header).toBeInTheDocument();
});

