import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { RequirementsCard } from "../../components/ApplyPageComponents/RequirementsCard";
import { useUserContext } from "../../context/UserContext";
import { setLeagueIdByLeagueName } from "../../functions/formChangeFunction";
import { useCountriesContext } from "../../context/CountriesContext";

vi.mock("../../context/UserContext", () => ({
    useUserContext: vi.fn(),
}));

vi.mock("../../functions/formChangeFunction", () => ({
    setLeagueIdByLeagueName: vi.fn(() => 3),
    formatDate: vi.fn((date) => date),
}));

vi.mock("../../context/CountriesContext", () => ({
    useCountriesContext: vi.fn(),
}));

describe("RequirementsCard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    vi.mocked(useUserContext).mockReturnValue({
        user: {
            id: 1,
            username: "testUser",
            name: "Test",
            surname: "User",
            email: "test@user.com",
            country: "Serbia",
            dateOfBirth: "2000-01-01",
            instagram: "@testuser",
            image: "image.png",
            league: 1,
            accepted: true,
            admin: false,
        },
        login: vi.fn(),
        logout: vi.fn(),
        setUser: vi.fn(),
    });

    vi.mocked(useCountriesContext).mockReturnValue({ countries: [] });

    test("renders component with title 'REQUIREMENTS:'", () => {
        render(<RequirementsCard leagueName="Legendary" />);
        expect(screen.getByText("REQUIREMENTS:")).toBeInTheDocument();
    });

    test("renders correct requirements for 'Legendary' league", () => {
        render(<RequirementsCard leagueName="Legendary" />);
        expect(screen.getByText(/10mu/i)).toBeInTheDocument();
        expect(screen.getByText(/50dips/i)).toBeInTheDocument();
        expect(screen.getByText(/30pulls/i)).toBeInTheDocument();
        expect(screen.getByText(/50dips/i)).toBeInTheDocument();
        expect(screen.getByText(/60pushups/i)).toBeInTheDocument();
        expect(screen.getByText(/10mu/i)).toBeInTheDocument();
        expect(screen.getByText(/under 5min/i)).toBeInTheDocument();
    });

    test("calls setLeagueIdByLeagueName with correct league name", () => {
        render(<RequirementsCard leagueName="Pro" />);
        expect(setLeagueIdByLeagueName).toHaveBeenCalledWith("Pro");
    });

    test("renders enabled 'Apply' button when user is eligible", () => {
        vi.mocked(useUserContext).mockReturnValue({
            user: {
                id: 1,
                username: "testUser",
                name: "Test",
                surname: "User",
                email: "test@user.com",
                country: "Serbia",
                dateOfBirth: "2000-01-01",
                instagram: "@testuser",
                image: "image.png",
                league: 5,
                accepted: true,
                admin: false,
            },
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });

        render(<RequirementsCard leagueName="Pro" />);
        const applyButton = screen.getByText("Apply");
        expect(applyButton).toBeEnabled();
    });

    test("renders disabled 'Apply' button when user is not eligible", () => {
        vi.mocked(useUserContext).mockReturnValue({
            user: {
                id: 1,
                username: "testUser",
                name: "Test",
                surname: "User",
                email: "test@user.com",
                country: "Serbia",
                dateOfBirth: "2000-01-01",
                instagram: "@testuser",
                image: "image.png",
                league: 1,
                accepted: true,
                admin: false,
            },
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });
        render(<RequirementsCard leagueName="Pro" />);
        const applyButton = screen.getByText("Apply");
        expect(applyButton).toBeDisabled();
    });

    test("renders disabled 'Apply' button when user is null", () => {
        vi.mocked(useUserContext).mockReturnValue({
            user: null,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });
        render(<RequirementsCard leagueName="Pro" />);
        const applyButton = screen.getByText("Apply");
        expect(applyButton).toBeEnabled();
    });

    test("opens modal when clicking 'Apply' button", () => {
        vi.mocked(useUserContext).mockReturnValue({
            user: {
                id: 1,
                username: "testUser",
                name: "Test",
                surname: "User",
                email: "test@user.com",
                country: "Serbia",
                dateOfBirth: "2000-01-01",
                instagram: "@testuser",
                image: "image.png",
                league: 5,
                accepted: true,
                admin: false,
            },
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });

        render(<RequirementsCard leagueName="Pro" />);

        const applyButton = screen.getByText("Apply");

        expect(screen.queryByTestId("apply-modal")).not.toBeInTheDocument();
    
        fireEvent.click(applyButton);

        expect(screen.getByTestId("apply-modal")).toBeInTheDocument();
    });
});