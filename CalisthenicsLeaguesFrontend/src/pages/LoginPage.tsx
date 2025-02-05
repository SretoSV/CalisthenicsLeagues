import { useEffect, useState } from 'react';
import styles from '../styles/LoginPageStyles/LoginPageStyle.module.css';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { serverPath } from '../functions/serverpath';
import { handleInputChange } from '../functions/formChangeFunction';

export function LoginPage(){
    const { user, login } = useUserContext();
    const navigate = useNavigate();
    const [change, setChange] = useState(false);

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const [resetPasswordForm, setResetPasswordForm] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    const handleClick = async () => {
        setChange(current => !current);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverPath()}User/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: "include",
              body: JSON.stringify(loginForm),
            });
      
            if (response.ok) {
              const userData = await response.json();
              login(userData);
            } 
            else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } 
        catch (err) {
            alert('Server error. Try again later.');
        }

    };

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverPath()}User/passwordreset`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: "include",
              body: JSON.stringify(resetPasswordForm),
            });
      
            const data = await response.json();
            alert(data.message);
        } 
        catch (err) {
            alert('Server error. Try again later.');
        }
    };
    
    useEffect(() => {
        if(user){
            navigate('/LeaguesPage');
        }
    }, [user]);

    return(
        
        <div className={styles.mainDiv}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className={styles.formContent}>
                    <div className={styles.formLeft}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e, setLoginForm)}
                        placeholder='email'
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder='password'
                        onChange={(e) => handleInputChange(e, setLoginForm)}
                        required
                    />
                    </div>
                </div>
                reset password <button className={styles.forgotButton} type="button" onClick={handleClick}></button>  <br />
                <button className={styles.submitButton}>Login</button>
            </form>
            {change && 
            <form className={styles.loginForm} onSubmit={handleReset}>
                <h1>Reset password</h1>
                <div className={styles.formContent}>
                    <div className={styles.formLeft}>
                    <label htmlFor="oldPassword">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder='email'
                        onChange={(e) => handleInputChange(e, setResetPasswordForm)}
                        required
                    />
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                        id="oldPassword"
                        type="password"
                        name="oldPassword"
                        autoComplete="off"
                        placeholder='old password'
                        onChange={(e) => handleInputChange(e, setResetPasswordForm)}
                        required
                    />
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        autoComplete="off"
                        placeholder='new password'
                        onChange={(e) => handleInputChange(e, setResetPasswordForm)}
                        required
                    />
                    </div>
                </div>
                <button className={styles.submitButton}>Reset</button>
            </form>
            }
        </div>
        
    );
}