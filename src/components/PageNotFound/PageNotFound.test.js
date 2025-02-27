import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PageNotFound from "./PageNotFound";
import Layout from "../Layout/Layout";

// Mocking the Layout component
jest.mock("../Layout/Layout", () => ({ children }) => <div>{children}</div>);

describe("PageNotFound Component", () => {
  it("renders the 404 message correctly", () => {
    render(<PageNotFound />);

    // Check if the 404 heading is in the document
    const heading = screen.getByText(/404/i);
    expect(heading).toBeInTheDocument();

    // Check if the error message is displayed
    const message = screen.getByText(/Oops! The page you're looking for doesn't exist./i);
    expect(message).toBeInTheDocument();
  });

  it("renders the 'Go Back to Home' button", () => {
    render(<PageNotFound />);

    // Check if the button is rendered
    const button = screen.getByRole("button", { name: /Go Back to Home/i });
    expect(button).toBeInTheDocument();
  });

  it("redirects to home page when the button is clicked", () => {
    // Mock the window.location.href to track the redirection
    delete window.location;
    window.location = { href: "" };

    render(<PageNotFound />);

    const button = screen.getByRole("button", { name: /Go Back to Home/i });

    // Simulate button click
    fireEvent.click(button);

    // Check if the location.href was set to "/"
    expect(window.location.href).toBe("/");
  });
});
