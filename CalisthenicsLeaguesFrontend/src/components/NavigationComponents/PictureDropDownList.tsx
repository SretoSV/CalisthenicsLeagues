import styles from '../../styles/NavigationStyles/PictureDropDownListStyle.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { DropDownListCard } from './DropDownListCard';
import { serverPath } from '../../functions/serverpath';
import { UserContext } from '../../context/UserContext';

export function PictureDropDownList(){
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext must be used within a UserProvider.");
    }
    const { user } = userContext;
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
            <div className={styles.nameDiv}>{user?.username}</div>
            <div className={styles.spaceDiv}></div>
            <div ref={dropdownRef}>
                <img
                    className={styles.profileImage}
                    src={serverPath()+user?.image}
                    alt="ProfilePicture"
                    onClick={toggleDropdown}
                />    
            
            {isDropdownOpen && <DropDownListCard />}
            </div>
        </div>
    );
}