import styles from '../../styles/NavigationStyles/PictureDropDownListStyle.module.css';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { serverPath } from '../../functions/serverpath';

export function DropDownListCard(){
    const navigate = useNavigate();
    const { logout } = useUserContext();

    const handleLogout = async () => {

        try {
            const response = await fetch(`${serverPath()}User/logout`, {
                method: 'POST',
                credentials: 'include',
            });
                        
            if (response.ok) {
                console.log('User logged out successfully!');
                logout();
                navigate('/LeaguesPage');
            } 
            else {
                console.error('Error while logging out...');
            }
        } 
        catch (error) {
            console.error('Error connecting to server: ', error);
        }
    };

    return(
        <>
            <div data-testid="drop-down-list-card" className={styles.dropdownStyle}>
                <div className={styles.triangleDivOuter}></div>
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
        </>
    );
}