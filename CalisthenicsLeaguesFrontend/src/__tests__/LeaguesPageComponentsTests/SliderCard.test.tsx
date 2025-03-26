import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SliderCard } from "../../components/LeaguesPageComponents/SliderCard";

describe("SliderCard", () => {

    test("renders initial image correctly", () => {
        render(<SliderCard />);
        const displayedImage = screen.getByAltText("Image");
        expect(displayedImage).toHaveAttribute("src", expect.stringContaining("background3.jpg"));
    });

    test("clicking next button changes the image", async () => {
        render(<SliderCard />);
        const nextButton = screen.getByRole("button", { name: "❯" });
      
        fireEvent.click(nextButton);
        
        const displayedImage = screen.getByAltText("Image");
        expect(displayedImage).toHaveAttribute("src", expect.stringContaining("background4.jpg"));
    });

    test("clicking previous button changes the image", async () => {
        render(<SliderCard />);
        const nextButton = screen.getByRole("button", { name: "❯" });
        const prevButton = screen.getByRole("button", { name: "❮" });
      
        fireEvent.click(nextButton);
        fireEvent.click(prevButton);
      
        const displayedImage = screen.getByAltText("Image");
        expect(displayedImage).toHaveAttribute("src", expect.stringContaining("background3.jpg"));
    });

    test("scroll down button triggers window.scrollTo", () => {
        window.scrollTo = vi.fn();
      
        render(<SliderCard />);
        const scrollButton = screen.getByRole("button", { name: "down" });
      
        fireEvent.click(scrollButton);
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 600, behavior: "smooth" });
    });
});
