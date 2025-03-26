import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { OurGoalCard } from "../../components/LeaguesPageComponents/OurGoalCard";

describe("OurGoalCard", () => {

    //zbog useInView 
    vi.stubGlobal("IntersectionObserver", class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
    });
    
    test("renders goal text correctly", () => {
        render(<OurGoalCard />);

        expect(screen.getByText("Our goal is to connnect all CALISTHENICS people in one place.")).toBeInTheDocument();
    });

});
