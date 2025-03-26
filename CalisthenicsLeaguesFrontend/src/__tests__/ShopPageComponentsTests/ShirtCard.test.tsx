import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ShirtCard } from "../../components/ShopPageComponents/ShirtCard";
import { useCartContext } from "../../context/CartContext";

describe("ShirtCard", () => {
    const props = {
        id: 1,
        leagueName: "Legendary",
        shirtImageBlackFront: "shirtImageBlackFront.jpg",
        shirtImageBlackBack: "shirtImageBlackBack.jpg",
        shirtImageWhiteFront: "shirtImageWhiteFront.jpg",
        shirtImageWhiteBack: "shirtImageWhiteBack.jpg",
        available: true,
        price: 20,
    };

    //zbog useInView 
    vi.stubGlobal("IntersectionObserver", class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
    });

    vi.mock("../../context/CartContext", () => ({
        useCartContext: vi.fn(), 
    }));

    const mockUpdateCartItems = vi.fn();
    vi.mocked(useCartContext).mockReturnValue({
        updateCartItems: mockUpdateCartItems,
        numberOfItems: 0,
        cartItems: [],
        removeItem: vi.fn(),
        emptyCart: vi.fn(),
    });

    test('renders shirt card with correct price and initial image', () => {
        render(<ShirtCard {...props} />);

        const priceElement = screen.getByText(/Price:/);
        const shirtImage = screen.getByAltText("Shirt");

        expect(priceElement).toHaveTextContent("Price: 20 €");
        expect(shirtImage).toHaveAttribute('src', expect.stringContaining('shirtImageBlackFront.jpg'));
    });

    test('changes shirt image color on click', () => {
        render(<ShirtCard {...props} />);
        
        const colorImage = screen.getByAltText("color");
        fireEvent.click(colorImage);
        
        const shirtImage = screen.getByAltText("Shirt");
        expect(shirtImage).toHaveAttribute('src', expect.stringContaining('shirtImageWhiteFront.jpg'));
    });

    test('changes shirt view from front to back', () => {
        render(<ShirtCard {...props} />);
        
        fireEvent.click(screen.getByTestId("front-radio"));
        const shirtImage = screen.getByAltText("Shirt");
        expect(shirtImage).toHaveAttribute('src', expect.stringContaining('shirtImageBlackFront.jpg'));
    
        fireEvent.click(screen.getByTestId("back-radio"));
        expect(shirtImage).toHaveAttribute('src', expect.stringContaining('shirtImageBlackBack.jpg'));
    });

    test('updates quantity when user changes the input', () => {
        render(<ShirtCard {...props} />);
    
        const quantityInput = screen.getByTestId("quantity-radio");
        fireEvent.change(quantityInput, { target: { value: '3' } });
        expect(quantityInput).toHaveValue(3);
    });

    test('disables Add To Cart button when product is unavailable', () => {
        const props = {
            id: 1,
            leagueName: "Legendary",
            shirtImageBlackFront: "shirtImageBlackFront.jpg",
            shirtImageBlackBack: "shirtImageBlackBack.jpg",
            shirtImageWhiteFront: "shirtImageWhiteFront.jpg",
            shirtImageWhiteBack: "shirtImageWhiteBack.jpg",
            available: false,
            price: 20,
        };

        render(<ShirtCard {...props} />);
        const addToCartButton = screen.getByRole("button", { name: "Add To Cart" });
    
        expect(addToCartButton).toBeDisabled();
    });

    test('calls updateCartItems when Add to Cart button is clicked', () => {

        render(<ShirtCard {...props} />);
    
        const addToCartButton = screen.getByRole("button", { name: "Add To Cart" });
        fireEvent.click(addToCartButton);
    
        expect(mockUpdateCartItems).toHaveBeenCalledWith(
            props.id,
            props.leagueName,
            expect.any(String),
            "S",
            1,
            1,
            props.price
        );
    });
    
});
