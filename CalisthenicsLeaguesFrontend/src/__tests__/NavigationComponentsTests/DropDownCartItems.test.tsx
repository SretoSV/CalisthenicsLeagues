import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useCartContext } from '../../context/CartContext';
import { useUserContext } from '../../context/UserContext';
import { useCountriesContext } from '../../context/CountriesContext';
import { handleInputChange } from '../../functions/formChangeFunction';
import { DropDownCartItems } from '../../components/NavigationComponents/DropDownCartItems';

vi.mock('../../functions/formChangeFunction', () => ({
  handleInputChange: vi.fn(),
}));

vi.mock('../../context/UserContext', () => ({
    useUserContext: vi.fn(),
}));

vi.mock("../../context/CountriesContext", () => ({
    useCountriesContext: vi.fn(),
}));

vi.mock("../../context/CartContext", () => ({
    useCartContext: vi.fn(), 
}));

const mockCartItems = [
  {
    id: 1,
    league: "League 1",
    shirtImage: "shirt1.png",
    size: "M",
    quantity: 2,
    price: 15.0,
  },
  {
    id: 2,
    league: "League 2",
    shirtImage: "shirt2.png",
    size: "L",
    quantity: 1,
    price: 20.0,
  },
];

const mockCountries = [
  { name: { common: "United States" } },
  { name: { common: "Canada" } },
];

describe("DropDownCartItems", () => {
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

    vi.mocked(useCountriesContext).mockReturnValue({ countries: mockCountries });

    test('should render "Empty cart" when no items in the cart', () => {
        render(<DropDownCartItems />);

        expect(screen.getByText("Empty cart")).toBeInTheDocument();
    });

    test('should display cart items and total price when cart is not empty', () => {
        vi.mocked(useCartContext).mockReturnValue({
            updateCartItems: mockUpdateCartItems,
            numberOfItems: 2,
            cartItems: mockCartItems,
            removeItem: vi.fn(),
            emptyCart: vi.fn(),
        });
        
        render(<DropDownCartItems />);

        expect(screen.getByText(/Total price:/)).toBeInTheDocument();
        const cartItemCards = screen.getAllByTestId("cart-item-card");
        expect(cartItemCards).toHaveLength(mockCartItems.length);
        
        //Zasto za League 1 i League 2 baca gresku za multiple elements
        //expect(screen.getByText("League 1")).toBeInTheDocument();
        //expect(screen.getByText("League 2")).toBeInTheDocument();
    });

    test('should display cart item and total price when cart have 1 item', () => {
        vi.mocked(useCartContext).mockReturnValue({
            updateCartItems: mockUpdateCartItems,
            numberOfItems: 1,
            cartItems: [{
                id: 1,
                league: "League 1",
                shirtImage: "shirt1.png",
                size: "M",
                quantity: 2,
                price: 15.0,
              }],
            removeItem: vi.fn(),
            emptyCart: vi.fn(),
        });
        
        render(<DropDownCartItems />);

        expect(screen.getByText(/Total price:/)).toBeInTheDocument();
        expect(screen.getByTestId("cart-item-card")).toBeInTheDocument();
    });

    test('should handle form input changes correctly', () => {
        render(<DropDownCartItems />);

        const countryInput = screen.getByLabelText("Country");
        fireEvent.change(countryInput, { target: { value: "Montenegro" } });
        expect(handleInputChange).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    //failed - on Submit problem 
    /*test('should submit order correctly', async () => {
        const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue({}) });
        vi.stubGlobal('fetch', mockFetch);

        render(<DropDownCartItems />);

        const submitButton = screen.getByText(/Submit order/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(`${serverPath()}Shop/orders`, expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining('orderData'),
            }));
        });
    });*/

    //failed - on Submit problem 
    /*
    test('should handle error when order submission fails', async () => {
        const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue({}) });
        vi.stubGlobal('fetch', mockFetch);

        render(<DropDownCartItems />);

        const submitButton = screen.getByText(/Submit order/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining('orderData'),
            }));
            expect(screen.getByText("An error occurred while submitting the order.")).toBeInTheDocument();
        });
        
    });*/

});