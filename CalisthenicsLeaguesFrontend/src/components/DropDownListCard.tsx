import styles from '../styles/PictureDropDownListStyle.module.css';

export function DropDownListCard(){
    
    const handleLogout = async () => {

    };

    return(
        <div className={styles.dropdownStyle}>
            <div className={styles.dropDownDivs}>
                <a className={styles.dropDownLinks} href="/Edit">Edit profile</a>
            </div>
            <br />
            <div className={styles.dropDownDivs}>
            <a
            className={styles.dropDownLinks}
            href="/Login"
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