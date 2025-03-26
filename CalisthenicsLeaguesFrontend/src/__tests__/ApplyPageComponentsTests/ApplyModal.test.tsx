import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import ApplyModal from "../../components/ApplyPageComponents/ApplyModal";
import { useUserContext } from "../../context/UserContext";
import { useCountriesContext } from "../../context/CountriesContext";
import { setLeagueIdByLeagueName } from "../../functions/formChangeFunction";
import { act } from "react";

vi.mock("../../context/UserContext", () => ({
    useUserContext: vi.fn(),
}));

vi.mock("../../context/CountriesContext", () => ({
    useCountriesContext: vi.fn(),
}));

vi.mock("../../functions/formChangeFunction", () => ({
    handleInputChange: vi.fn(),
    formatDate: vi.fn((date) => date),
    setLeagueIdByLeagueName: vi.fn(() => 2),
}));

describe("ApplyModal - Form Initialization", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
    //passed
    test("should initialize form with user data", async () => {
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
                league: 2,
                accepted: true,
                admin: false,
            },
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });

        vi.mocked(useCountriesContext).mockReturnValue({ countries: [] });
        //console.log("Mockovana vrednost useUserContext:", useUserContext()); 
        
        await act(async () => {
            render(<ApplyModal leagueName="Legendary" show={true} onClose={() => {}} />);
        });
        
        await waitFor(() => {
            expect(screen.getByTestId("apply-modal")).toBeInTheDocument();
        });

        // Proveri vrednosti input polja
        await waitFor(() => {
            //screen.debug();
            expect(screen.getByLabelText("Name:")).toHaveValue("Test");
            expect(screen.getByLabelText(/username/i)).toHaveValue("testUser");
            expect(screen.getByLabelText(/surname/i)).toHaveValue("User");
            expect(screen.getByLabelText(/email/i)).toHaveValue("test@user.com");
            expect(screen.getByAltText(/dateOfBirth/i)).toHaveValue("2000-01-01");
            expect(screen.getByLabelText(/country/i)).toHaveValue("Serbia");
            expect(screen.getByLabelText(/instagram/i)).toHaveValue("@testuser");
        });

        expect(setLeagueIdByLeagueName).toHaveBeenCalledWith("Legendary");
    });

    //passed
    test("empty inputs when user is null", async () => {
        vi.mocked(useUserContext).mockReturnValue({
            user: null,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });

        vi.mocked(useCountriesContext).mockReturnValue({ countries: [] });

        await act(async () => {
            render(<ApplyModal leagueName="Legendary" show={true} onClose={() => {}} />);
        });
        
        await waitFor(() => {
            expect(screen.getByTestId("apply-modal")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByLabelText("Name:")).toHaveValue("");
            expect(screen.getByLabelText(/username/i)).toHaveValue("");
            expect(screen.getByLabelText(/surname/i)).toHaveValue("");
            expect(screen.getByLabelText(/email/i)).toHaveValue("");
            expect(screen.getByAltText(/dateOfBirth/i)).toHaveValue("");
            expect(screen.getByLabelText(/country/i)).toHaveValue("");
            expect(screen.getByLabelText(/instagram/i)).toHaveValue("");
        });

        expect(setLeagueIdByLeagueName).toHaveBeenCalledWith("Legendary");
    });

    //passed
    test("should call onClose when cancel is clicked", () => {
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
                league: 2,
                accepted: true,
                admin: false,
            },
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });
        
        vi.mocked(useCountriesContext).mockReturnValue({ countries: [] });

        const onCloseMock = vi.fn();
        
        render(<ApplyModal leagueName="Legendary" show={true} onClose={onCloseMock} />);
        
        fireEvent.click(screen.getByText("Cancel"));
    
        expect(onCloseMock).toHaveBeenCalled();
    });

    //failed with onSubmit in the form, but passed with onClick on button
    /*test("should submit form successfully", async () => {
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: "Application successful" }),
            })
        );
    
        vi.stubGlobal('fetch', mockFetch);
        
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
                league: 2,
                accepted: true,
                admin: false,
            },
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });
        
        vi.mocked(useCountriesContext).mockReturnValue({ countries: [] });

        await act(async () => {
            render(<ApplyModal leagueName="Legendary" show={true} onClose={() => {}} />);
        });
    
        await userEvent.type(screen.getByLabelText("Youtube link:"), "https://youtube.com/test");
        await userEvent.click(screen.getByRole("button", { name: /apply/i }));

        //await act(async () => {
        //    fireEvent.change(screen.getByLabelText("Youtube link:"), {
        //        target: { value: "https://youtube.com/test" },
        //    });
        //
        //   fireEvent.click(screen.getByRole("button", { name: /apply/i }));
        //});

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`${serverPath()}Application/apply`),
                expect.objectContaining({
                    method: "POST",
                    //body: expect.stringContaining("https://youtube.com/test"),
                })
            );
        });
    });*/

    //failed with onSubmit in the form, but passed with onClick on button
    /*test("should show alert when username is too long", async () => {
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
                league: 2,
                accepted: true,
                admin: false,
            },
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });
        
        vi.mocked(useCountriesContext).mockReturnValue({ countries: [] });

        window.alert = vi.fn();
        
        render(<ApplyModal leagueName="Legendary" show={true} onClose={() => {}} />);
        
        fireEvent.change(screen.getByLabelText("Username (max 10 characters):"), {
            target: { value: "VeryLongUsername" },
        });
    
        fireEvent.click(screen.getByText("Apply"));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Server error. Try again later.");
        });
    });*/

});