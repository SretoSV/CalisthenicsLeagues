import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Navigation } from "../../components/NavigationComponents/Navigation";
import { useUserContext } from "../../context/UserContext";
import { useCartContext } from "../../context/CartContext";

vi.mock('../../context/UserContext', () => ({
    useUserContext: vi.fn(),
}));

vi.mock("../../context/CartContext", () => ({
    useCartContext: vi.fn(), 
}));

describe("Navigation", () => {

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

    const mockUpdateCartItems = vi.fn();
    vi.mocked(useCartContext).mockReturnValue({
        updateCartItems: mockUpdateCartItems,
        numberOfItems: 0,
        cartItems: [],
        removeItem: vi.fn(),
        emptyCart: vi.fn(),
    });

    test('renders logo with correct alt and src', () => {
        render(<Navigation isApplyPage={false} />);
        const logo = screen.getByAltText("Logo");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining('logo.png'));
    });

    test('renders login link when user is not logged in and isApplyPage is true', () => {
        vi.mocked(useUserContext).mockReturnValue({
                user: null,
                login: vi.fn(),
                logout: vi.fn(),
                setUser: vi.fn(),
        });

        render(<Navigation isApplyPage={true} />);
        const loginLink = screen.getByText('Login');
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute('href', '../LoginPage');
    });

    test('renders login link when user is not logged in and isApplyPage is false', () => {
        vi.mocked(useUserContext).mockReturnValue({
            user: null,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });

        render(<Navigation isApplyPage={false} />);
        const loginLink = screen.getByText('Login');
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute('href', 'LoginPage');
    });

    test('renders correct links when user is logged in and not admin', () => {
        //radi test i bez mockovanja user-a unutar test-a, ali samo 
        //kad je ovo prvi ili jedini test inace ovi pre njega
        //poniste globalno mockovan-og user-a i desi se greska kod chat-a
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

        render(<Navigation isApplyPage={false} />);
        expect(screen.getByText('Leagues')).toBeInTheDocument();
        expect(screen.getByText('Members')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.getByText('Chat')).toBeInTheDocument();
        expect(screen.queryByText('Applications')).toBeNull();
    });

    test('renders correct links when user is logged in and is admin', () => {
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
                admin: true,
            },
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });
        render(<Navigation isApplyPage={false} />);
        expect(screen.getByText('Leagues')).toBeInTheDocument();
        expect(screen.getByText('Members')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.getByText('Chat')).toBeInTheDocument();
        expect(screen.getByText('Applications')).toBeInTheDocument();
    });

    test('renders CartCard and PictureDropDownList when user is logged in', () => {
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
        render(<Navigation isApplyPage={false} />);
        expect(screen.getByTestId("cart-card")).toBeInTheDocument();
        expect(screen.getByTestId("picture-drop-down-list")).toBeInTheDocument();
    });

    test('renders correct links when user is logged out', () => {
        vi.mocked(useUserContext).mockReturnValue({
            user: null,
            login: vi.fn(),
            logout: vi.fn(),
            setUser: vi.fn(),
        });
        render(<Navigation isApplyPage={false} />);
        expect(screen.getByText('Leagues')).toBeInTheDocument();
        expect(screen.getByText('Members')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.queryByText('Chat')).toBeNull();
    });

});
