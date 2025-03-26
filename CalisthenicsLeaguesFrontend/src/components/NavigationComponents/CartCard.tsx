import styles from '../../styles/NavigationStyles/CartCardStyle.module.css';
import { useEffect, useRef, useState } from 'react';
import cartImage from '../../images/cart.png';
import { useCartContext } from '../../context/CartContext';
import { DropDownCartItems } from './DropDownCartItems';

export function CartCard(){
    const { numberOfItems } = useCartContext();

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
        <div data-testid="cart-card" className={styles.mainDiv}>
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