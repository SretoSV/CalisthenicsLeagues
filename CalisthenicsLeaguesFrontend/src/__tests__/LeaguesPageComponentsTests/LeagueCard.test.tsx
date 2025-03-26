import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { serverPath } from "../../functions/serverpath";
import { LeagueCard } from "../../components/LeaguesPageComponents/LeagueCard";

describe("LeagueCard", () => {
    const props = {
        id: 1,
        leagueName: "Legendary",
        leagueImage: "legendary.png"
    };

    //zbog useInView 
    vi.stubGlobal("IntersectionObserver", class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
    });
    
    test("renders league name and image correctly", () => {
        render(<LeagueCard {...props} />);

        expect(screen.getByRole("heading", { name: "Legendary" })).toBeInTheDocument();

        const leagueImage = screen.getByAltText("League");
        expect(leagueImage).toHaveAttribute("src", `${serverPath()}legendary.png`);
    });

    test("renders apply button with correct link", () => {
        render(<LeagueCard {...props} />);
        
        const applyButton = screen.getByRole("link", { name: "Apply" });
        expect(applyButton).toHaveAttribute("href", "ApplyPage/Legendary");
    });
});
