import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useUserContext } from "../../context/UserContext";
import { useCartContext } from "../../context/CartContext";
import { CartCard } from "../../components/NavigationComponents/CartCard";
import { useCountriesContext } from "../../context/CountriesContext";

vi.mock('../../context/UserContext', () => ({
    useUserContext: vi.fn(),
}));

vi.mock("../../context/CartContext", () => ({
    useCartContext: vi.fn(), 
}));

vi.mock("../../context/CountriesContext", () => ({
    useCountriesContext: vi.fn(),
}));

describe("CartCard", () => {

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

    vi.mocked(useCountriesContext).mockReturnValue({ countries: [] });

    test('renders the correct number of items in cart when numberOfItems is greater than 0', () => {
        vi.mocked(useCartContext).mockReturnValue({
            updateCartItems: mockUpdateCartItems,
            numberOfItems: 5,
            cartItems: [],
            removeItem: vi.fn(),
            emptyCart: vi.fn(),
        });

        render(<CartCard />);
        const numberOfItemsElement = screen.getByText('5');
        expect(numberOfItemsElement).toBeInTheDocument();
    });

    test('does not render number of items when numberOfItems is 0', () => {
        render(<CartCard />);
        const numberOfItemsElement = screen.queryByText('0');
        expect(numberOfItemsElement).not.toBeInTheDocument();
    });

    test('opens the dropdown when the cart icon is clicked', () => {
        vi.mocked(useCartContext).mockReturnValue({
            updateCartItems: mockUpdateCartItems,
            numberOfItems: 3,
            cartItems: [],
            removeItem: vi.fn(),
            emptyCart: vi.fn(),
        });

        render(<CartCard />);
        
        const cartIcon = screen.getByAltText('CartPicture');
        fireEvent.click(cartIcon);
        
        const dropdown = screen.getByTestId('drop-down-cart-items');
        expect(dropdown).toBeInTheDocument();
    });

    test('closes the dropdown when clicking outside', () => {
        vi.mocked(useCartContext).mockReturnValue({
            updateCartItems: mockUpdateCartItems,
            numberOfItems: 3,
            cartItems: [],
            removeItem: vi.fn(),
            emptyCart: vi.fn(),
        });
        render(<CartCard />);
        
        const cartIcon = screen.getByAltText('CartPicture');
        fireEvent.click(cartIcon);
        
        const dropdown = screen.getByTestId('drop-down-cart-items');
        expect(dropdown).toBeInTheDocument();

        fireEvent.click(document);
        expect(dropdown).not.toBeInTheDocument();
    });

    test('does not show dropdown initially', () => {
        vi.mocked(useCartContext).mockReturnValue({
            updateCartItems: mockUpdateCartItems,
            numberOfItems: 3,
            cartItems: [],
            removeItem: vi.fn(),
            emptyCart: vi.fn(),
        });
        render(<CartCard />);
        //mora queryBy jer on vraca null ako ne pronadje element pa ne baca gresku
        const dropdown = screen.queryByTestId('drop-down-cart-items');
        expect(dropdown).not.toBeInTheDocument();
    });
      
});
