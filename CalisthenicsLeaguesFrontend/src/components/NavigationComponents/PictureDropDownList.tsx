import styles from '../../styles/NavigationStyles/PictureDropDownListStyle.module.css';
import { useEffect, useRef, useState } from 'react';
import { DropDownListCard } from './DropDownListCard';
import { serverPath } from '../../functions/serverpath';
import { useUserContext } from '../../context/UserContext';

export function PictureDropDownList(){
    const { user } = useUserContext();
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
        <div data-testid="picture-drop-down-list" className={styles.mainDiv}>
            <div ref={dropdownRef}>
                <img
                    className={styles.profileImage}
                    src={serverPath()+user?.image}
                    alt="ProfilePicture"
                    onClick={toggleDropdown}
                />    
            
            {isDropdownOpen && <DropDownListCard />}
            </div>
            <div className={styles.nameDiv}>{user?.username}</div>
            
        </div>
    );
}