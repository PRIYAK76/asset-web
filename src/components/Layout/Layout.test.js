import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

// Mock the Navbar component
jest.mock("../Navbar/Navbar", () => () => <div data-testid="navbar">Navbar</div>);

describe("Layout Component", () => {
  it("renders the Navbar component", () => {
    render(<Layout>Test Children</Layout>);

    // Check if the Navbar is rendered
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("renders the children content", () => {
    const testChildren = <div data-testid="test-children">Test Children</div>;
    render(<Layout>{testChildren}</Layout>);

    // Check if the children content is rendered
    const childrenContent = screen.getByTestId("test-children");
    expect(childrenContent).toBeInTheDocument();
    expect(childrenContent).toHaveTextContent("Test Children");
  });

  it("renders the footer with the correct content", () => {
    render(<Layout>Test Children</Layout>);

    // Check if the footer is rendered
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Check the footer content
    expect(footer).toHaveTextContent("© 2025 - assetmanagementMVC");
    expect(footer).toHaveTextContent("Privacy Policy");
  });

  it("applies the correct CSS classes to the footer", () => {
    render(<Layout>Test Children</Layout>);

    // Check if the footer has the correct CSS classes
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("border-top");
    expect(footer).toHaveClass("footer");
    expect(footer).toHaveClass("text-muted");
    expect(footer).toHaveClass("bg-cyan");
    expect(footer).toHaveClass("p-3");
    expect(footer).toHaveClass("mt-4");
  });

  it("renders the Navbar component", () => {
    render(<Layout>Test Children</Layout>);

    // Check if the Navbar is rendered
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });
  
});