import { useContext } from 'react';
import styles from '../../styles/NavigationStyles/PictureDropDownListStyle.module.css';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export function DropDownListCard(){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext must be used within a UserProvider.");
    }
    const { logout } = userContext;

    const handleLogout = async () => {
        //logout();
        try {
            const response = await fetch('http://localhost:5099/User/logout', {
                method: 'POST',
                credentials: 'include',
            });
                        
            if (response.ok) {
                console.log('Korisnik je uspešno odjavljen');
                logout();
                navigate('/LeaguesPage');
            } 
            else {
                console.error('Greška prilikom odjave');
            }
        } 
        catch (error) {
            console.error('Greška prilikom povezivanja sa serverom:', error);
        }
    };

    return(
        <div className={styles.dropdownStyle}>
            <div className={styles.dropDownDivs}>
                <a className={styles.dropDownLinks} href="/EditPage">Edit profile</a>
            </div>
            <br />
            <div className={styles.dropDownDivs}>
                <a
                className={styles.dropDownLinks}
                href="/LoginPage"
                onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                }}
                >
                    Logout
                </a>
            </div>
        </div>
    );
}