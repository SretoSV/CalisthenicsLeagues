import styles from '../../styles/NavigationStyles/PictureDropDownListStyle.module.css';

export function DropDownListCard(){
    
    const handleLogout = async () => {

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