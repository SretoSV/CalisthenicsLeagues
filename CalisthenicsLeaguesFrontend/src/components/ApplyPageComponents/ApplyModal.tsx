import { useEffect, useState } from 'react';
import styles from '../../styles/ApplyPageStyles/ApplyPageStyle.module.css';
import { serverPath } from '../../functions/serverpath';
import { handleInputChange, setLeagueIdByLeagueName } from '../../functions/formChangeFunction';
import { useCountriesContext } from '../../context/CountriesContext';
import { useUserContext } from '../../context/UserContext';

interface ApplyModalProps {
    leagueName: string,
    show: boolean,
    onClose: () => void; 
}

export default function ApplyModal({ onClose, show, leagueName }: ApplyModalProps) {
    const { user } = useUserContext();
    const { countries } = useCountriesContext();
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    const [form, setForm] = useState({
        username: '',
        name: '',
        surname: '',
        password: '',
        email: '',
        country: '',
        dateOfBirth: '',
        youtubeLink: '',
        instagram: '',
        league: 0,
    });

    useEffect(() => {
        if (localStorage.getItem('user')) {
          setForm({
            username: user?.username || '',
            name: user?.name || '',
            surname: user?.surname || '',
            password: '',
            email: user?.email || '',
            country: user?.country || '',
            dateOfBirth: formatDate(user?.dateOfBirth || ''),
            youtubeLink: '',
            instagram: user?.instagram || '',
            league: setLeagueIdByLeagueName(leagueName) || 0,
          });
        }
    }, [user]);

    useEffect(() => {
        setForm(prevForm => ({
            ...prevForm,
            league: setLeagueIdByLeagueName(leagueName) || 0
        }));
    }, [leagueName]);

    if (!show) return null;

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(form.username.length > 10){
            alert("Username can have up to 10 characters!")
        }
        else{
            try {
                const response = await fetch(`${serverPath()}Application/apply`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify(form),
                });
            
                const data = await response.json();  
                
                if (response.ok) {
                    alert(data.message);
                }
                else {
                    alert(`Error: ${data.message}`);
                }
            } 
            catch (err) {
                alert('Server error. Try again later.');
            }
        }
        onClose();
    };

    return (
        user ? 
        <form className={styles.modalOverlay} onSubmit={handleSubmit}>
            <div className={styles.modalContent}>
            <div>
                Put only Youtube Link, your information we already have.
            </div>
            <br />
            <div className={styles.formModal}>
                <label htmlFor="Username">Username (max 10 characters):</label>
                <input 
                    id="Username" 
                    name="username"
                    type="text" 
                    value={form.username} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    disabled
                    required
                />

                <label htmlFor="Password">Password:</label>
                <input 
                    id="Password" 
                    type="password" 
                    name="password"
                    placeholder='/'
                    value={form.password} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    disabled
                    required
                />

                <label htmlFor="Name">Name:</label>
                <input 
                    id="Name" 
                    type="text" 
                    name="name"
                    value={form.name} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    disabled
                    required
                />
    
                <label htmlFor="Surname">Surname:</label>
                <input 
                    id="Surname" 
                    type="text" 
                    name="surname"
                    value={form.surname} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    disabled
                    required
                />

                <label htmlFor="Email">Email:</label>
                <input 
                    id="Email" 
                    type="email" 
                    name="email"
                    value={form.email} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    disabled
                    required
                />

                <label htmlFor="country">Country:</label>
                <input
                    id="country"
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={(e) => handleInputChange(e, setForm)}
                    list="countries-list"
                    autoComplete="off"
                    disabled
                    required
                />
                <datalist id="countries-list">
                    {countries.map((country) => (
                    <option key={country.name.common} value={country.name.common} />
                    ))}
                </datalist>

                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input 
                    id="dateOfBirth"
                    type="date" 
                    name="dateOfBirth"
                    defaultValue={form.dateOfBirth || ""} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    max={new Date().toISOString().split("T")[0]} 
                    required
                    disabled
                />

                <label htmlFor="youtubeLink">Youtube link:</label>
                <input 
                    id="youtubeLink" 
                    type="text" 
                    name="youtubeLink"
                    value={form.youtubeLink} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    required
                />

                <label htmlFor="instagram">Instagram (optional):</label>
                <input 
                    id="instagram" 
                    type="text" 
                    name="instagram"
                    value={form.instagram} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    disabled
                />

            </div>
    
            <div className={styles.buttonsDiv}>
                <button 
                    className={styles.closeButton} 
                    type="button" 
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button 
                    className={styles.applyButtonModal} 
                    type="submit"
                >
                    Apply
                </button>
            </div>
            </div>
        </form>
        :
        <form className={styles.modalOverlay} onSubmit={handleSubmit}>
            <div className={styles.modalContent}>
            <div>
                Enter your information to be able to log in, if your application is accepted.
            </div>
            <br />
            <div className={styles.formModal}>
                <label htmlFor="Username">Username (max 10 characters):</label>
                <input 
                    id="Username" 
                    name="username"
                    type="text" 
                    value={form.username} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    required
                />

                <label htmlFor="Password">Password:</label>
                <input 
                    id="Password" 
                    type="password" 
                    name="password"
                    value={form.password} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    required
                />

                <label htmlFor="Name">Name:</label>
                <input 
                    id="Name" 
                    type="text" 
                    name="name"
                    value={form.name} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    required
                />
    
                <label htmlFor="Surname">Surname:</label>
                <input 
                    id="Surname" 
                    type="text" 
                    name="surname"
                    value={form.surname} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    required
                />

                <label htmlFor="Email">Email:</label>
                <input 
                    id="Email" 
                    type="email" 
                    name="email"
                    value={form.email} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    required
                />

                <label htmlFor="country">Country:</label>
                <input
                    id="country"
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={(e) => handleInputChange(e, setForm)}
                    list="countries-list"
                    autoComplete="off"
                    required
                />
                <datalist id="countries-list">
                    {countries.map((country) => (
                    <option key={country.name.common} value={country.name.common} />
                    ))}
                </datalist>

                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input 
                    id="dateOfBirth"
                    type="date" 
                    name="dateOfBirth"
                    defaultValue={form.dateOfBirth || ""} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    max={new Date().toISOString().split("T")[0]} 
                    required
                />

                <label htmlFor="youtubeLink">Youtube link:</label>
                <input 
                    id="youtubeLink" 
                    type="text" 
                    name="youtubeLink"
                    value={form.youtubeLink} 
                    onChange={(e) => handleInputChange(e, setForm)}
                    required
                />

                <label htmlFor="instagram">Instagram (optional):</label>
                <input 
                    id="instagram" 
                    type="text" 
                    name="instagram"
                    value={form.instagram} 
                    onChange={(e) => handleInputChange(e, setForm)}
                />

            </div>
    
            <div className={styles.buttonsDiv}>
                <button 
                    className={styles.closeButton} 
                    type="button" 
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button 
                    className={styles.applyButtonModal} 
                    type="submit"
                >
                    Apply
                </button>
            </div>
            </div>
        </form>
    );
}