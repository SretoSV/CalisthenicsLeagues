import styles from '../styles/PictureDropDownListStyle.module.css';
import placeHolder from '../images/placeHolder.png';
import { useEffect, useRef, useState } from 'react';
import { DropDownListCard } from './DropDownListCard';

export function PictureDropDownList(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            //dropdownRef sadrzi referncu na element na koji pokazuje i time mozemo
            //da direktno pristupimo svojstvima tog elementa
            //contains(event.target) proverava da li je element na koji je kliknuto
            //unutar drop down-a, ako jeste ostaje otvoren, ako nije zatvara se
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
            <div className={styles.nameDiv}>Name</div>
            <div className={styles.spaceDiv}></div>
            <div ref={dropdownRef}>
                <img
                    className={styles.profileImage}
                    src={placeHolder}
                    alt="ProfilePicture"
                    onClick={toggleDropdown}
                />    
            
            {isDropdownOpen && <DropDownListCard />}
            </div>
        </div>
    );
}