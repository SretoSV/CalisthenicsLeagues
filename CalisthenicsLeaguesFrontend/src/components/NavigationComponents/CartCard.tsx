import styles from '../../styles/NavigationStyles/CartCardStyle.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import cartImage from '../../images/cart.png';
import { CartContext } from '../../context/CartContext';
import { DropDownCartItems } from './DropDownCartItems';

export function CartCard(){
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error("CartContext must be used within a CartProvider.");
    }
    const { numberOfItems } = cartContext;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLDivElement)) {
                setIsDropdownOpen(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.mainDiv}>
            {
                (numberOfItems == 0) ? (<div></div>) : 
                <div className={styles.numberOfItems}>
                    <b>{numberOfItems}</b>
                </div>
            }
            
            <div ref={dropdownRef}>
                <img
                    className={styles.cartImage}
                    src={cartImage}
                    alt="CartPicture"
                    onClick={toggleDropdown}
                />    
            
            {isDropdownOpen && <DropDownCartItems />}
            </div>
            
        </div>
    );
}