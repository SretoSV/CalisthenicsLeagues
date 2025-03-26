import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { AthleteCard } from "../../components/LeagueMembersPageComponents/AthleteCard";
import { serverPath } from "../../functions/serverpath";

describe("AthleteCard", () => {
    const props = {
        id: 1,
        Name:"John",
        Surname:"Doe",
        Country:"USA",
        Instagram:"johndoe",
        Image:"profile.jpg"
    };

    //zbog useInView 
    vi.stubGlobal("IntersectionObserver", class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
    });

    test("renders athlete name and surname", () => {
        render(<AthleteCard {...props} />);
    
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    test("renders country name", () => {
        render(<AthleteCard {...props} />);
        expect(screen.getByText("USA")).toBeInTheDocument();
    });
    
    test("renders correct Instagram link", () => {
        render(<AthleteCard {...props} />);
        const instagramLink = screen.getByRole("link", { name: "@johndoe" });
        expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com/johndoe");
    });
    
    test("renders correct athlete image src", () => {
        render(<AthleteCard {...props} />);
        const athleteImage = screen.getByAltText("athlete");
        expect(athleteImage).toHaveAttribute("src", `${serverPath()}profile.jpg`);
    });
});
