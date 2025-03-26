import '@testing-library/jest-dom';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen } from "@testing-library/react";
import { ApplicationCard } from '../../components/AdminPageComponents/ApplicationCard';
import userEvent from "@testing-library/user-event";

const mockProps = {
    Id: 1,
    Username: "TestUser",
    Name: "Test",
    Surname: "User",
    Email: "test@user.com",
    Country: "Serbia",
    DateOfBirth: new Date("2000-01-01"),
    YoutubeLink: "https://youtube.com/samplevideo",
    Instagram: "testuser",
    League: 3,
    onDelete: vi.fn(),
};

describe('ApplicationCard', () => {
    afterEach(() => {
        vi.restoreAllMocks(); //Resetuje sve mock-ove i stubove
    });

    test("Calls the onDelete function when the button Accept is clicked", async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
            })
        ));

        render(<ApplicationCard {...mockProps} />);

        await userEvent.click(screen.getByText("Accept"));

        expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
        expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.Id);
    });

    test("Calls the onDelete function when the button Reject is clicked", async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
            })
        ));

        render(<ApplicationCard {...mockProps} />);

        await userEvent.click(screen.getByText("Reject"));

        expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
        expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.Id);
    });

    test("Does not call the onDelete function when the button is clicked", async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
            })
        ));

        render(<ApplicationCard {...mockProps} />);

        await userEvent.click(screen.getByText("Accept"));
        await userEvent.click(screen.getByText("Reject"));
        expect(mockProps.onDelete).toHaveBeenCalledTimes(0);
    });

    test("Displays user data", () => {
        render(<ApplicationCard {...mockProps} />);
        
        expect(screen.getByText(/Username:/)).toHaveTextContent("TestUser");
        expect(screen.getByText(/Name:/)).toHaveTextContent("Test");
        expect(screen.getByText(/Surname:/)).toHaveTextContent("User");
        expect(screen.getByText(/Email:/)).toHaveTextContent("test@user.com");
        expect(screen.getByText(/Country:/)).toHaveTextContent("Serbia");
        expect(screen.getByText(/League:/)).toHaveTextContent("3");
    });

    test("Youtube i Instagram links are correct", () => {
        render(<ApplicationCard {...mockProps} />);
      
        const youtubeLink = screen.getByText("CLICK FOR VIDEO APPLICATION");
        expect(youtubeLink).toHaveAttribute("href", "https://youtube.com/samplevideo");
      
        const instagramLink = screen.getByText("@testuser");
        expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com/testuser");
    });

});
