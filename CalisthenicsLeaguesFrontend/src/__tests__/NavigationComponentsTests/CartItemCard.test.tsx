import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useCartContext } from '../../context/CartContext';
import { CartItemCard } from '../../components/NavigationComponents/CartItemCard';

vi.mock("../../context/CartContext", () => ({
    useCartContext: vi.fn(), 
}));

describe("CartItemCard", () => {
    const itemProps = {
        id:1,
        league:"Legendary",
        shirtImage:"shirt.png",
        size:"M", 
        quantity:2,
        price:60
    }

    const mockUpdateCartItems = vi.fn();
    const mockRemoveItem = vi.fn();
    vi.mocked(useCartContext).mockReturnValue({
        updateCartItems: mockUpdateCartItems,
        numberOfItems: 0,
        cartItems: [],
        removeItem: mockRemoveItem,
        emptyCart: vi.fn(),
    });

    
    test('renders CartItemCard with correct data', () => {
        render(<CartItemCard {...itemProps} />);
    
        expect(screen.getByText(/Legendary/i)).toBeInTheDocument();
        expect(screen.getByText(/Size: M/i)).toBeInTheDocument();
        expect(screen.getByText(/Price: 120.00 €/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /X/i })).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('shirt.png'));
    });

    test('updates quantity input value on change', () => {
        render(<CartItemCard {...itemProps} />);
    
        const quantityInput = screen.getByRole('spinbutton');
        fireEvent.change(quantityInput, { target: { value: '5' } });
    
        expect(quantityInput).toHaveValue(5);
    });

    test('calls removeItem on button click', () => {
        render(<CartItemCard {...itemProps} />);
    
        fireEvent.click(screen.getByRole('button', { name: /X/i }));
    
        expect(mockRemoveItem).toHaveBeenCalledWith(1, "Legendary", "shirt.png", "M");
    });
    
    test('calls updateCartItems when quantity changes', () => {
        render(<CartItemCard {...itemProps} />);
    
        const quantityInput = screen.getByRole('spinbutton');
        fireEvent.change(quantityInput, { target: { value: '4' } });
    
        expect(mockUpdateCartItems).toHaveBeenCalledWith(1, "Legendary", "shirt.png", "M", 4, 2, 60);
    });


});