import { useContext, useEffect, useState } from 'react';
import styles from '../styles/LoginPageStyles/LoginPageStyle.module.css';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage(){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext must be used within a UserProvider.");
    }
    const { user, login } = userContext;

    const [forgot, setForgot] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [form2, setForm2] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });
    const [error, setError] = useState("");
    const [error2, setError2] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("AAAAAAAAAA");

        try {
            const response = await fetch('http://localhost:5099/User/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: "include",
              body: JSON.stringify({ 
                email: form.email,
                password: form.password  
              }),
            });
      
            if (response.ok) {
              const userData = await response.json();
              login(userData);
              setError("");
            } 
            else {
              setError('Neispravni podaci za prijavu.');
            }
        } 
        catch (err) {
            setError('Greška na serveru. Pokušajte kasnije.');
        }


    };

    useEffect(() => {
        if(user){
            navigate('/LeaguesPage');
        }
      }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
        setForm({
           ...form,
           [e.target.name]: e.target.value, 
        });
    } 

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("RESET BB");

        try {
            const response = await fetch('http://localhost:5099/User/passwordreset', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: "include",
              body: JSON.stringify({ 
                email: form2.email,
                OldPassword: form2.oldPassword,
                NewPassword: form2.newPassword  
              }),
            });
      
            if (response.ok) {
              setError2("Uspesno izmenjena lozinka");
            } 
            else {
              setError2('Neispravni podaci.');
            }
        } 
        catch (err) {
            setError2('Greška na serveru. Pokušajte kasnije.');
        }
    };

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>)  => {
        setForm2({
           ...form2,
           [e.target.name]: e.target.value, 
        });
    };

    const handleClick = async () => {
        setForgot(current => !current);
    };

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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                forgot password? <button className={styles.forgotButton} type="button" onClick={handleClick}></button>  <br />
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.submitButton}>Login</button>
            </form>
            {forgot && 
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
                        onChange={handleChange2}
                        required
                    />
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                        id="oldPassword"
                        type="password"
                        name="oldPassword"
                        autoComplete="off"
                        placeholder='old password'
                        onChange={handleChange2}
                        required
                    />
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        autoComplete="off"
                        placeholder='new password'
                        onChange={handleChange2}
                        required
                    />
                    </div>
                </div>
                {error2 && <p className={styles.error}>{error2}</p>}
                <button className={styles.submitButton}>Reset</button>
            </form>
            }
        </div>
        
    );
}