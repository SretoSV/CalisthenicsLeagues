import { useEffect, useState } from 'react';
import styles from '../../styles/ApplyPageStyles/ApplyPageStyle.module.css';
import { serverPath } from '../../functions/serverpath';

interface ApplyModalProps {
    leagueName: string,
    show: boolean,
    onClose: () => void; 
}

interface Country {
    name: {
      common: string;
    };
    flags: {
      png: string;
      svg: string;
    };
  }

export default function ApplyModal({ onClose, show, leagueName }: ApplyModalProps) {

    useEffect(() => {
        switch (leagueName){
            case "Legendary":
                form.league = 1;
                break;
            case "World-Class":
                form.league = 2;
                break;
            case "Pro":
                form.league = 3;
                break;
            case "Semi-pro":
                form.league = 4;
                break;
            case "Amateur":
                form.league = 5;
                break;
            case "Begginer":
                form.league = 6;
                break; 
        }
    }, [leagueName]);
    
    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching countries:", error));
    }, []);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
        setForm({
          ...form,
          [e.target.name]: e.target.value, 
        });
    }

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
                    onChange={handleChange} 
                    required
                />

                <label htmlFor="Password">Password:</label>
                <input 
                    id="Password" 
                    type="password" 
                    name="password"
                    value={form.password} 
                    onChange={handleChange} 
                    required
                />

                <label htmlFor="Name">Name:</label>
                <input 
                    id="Name" 
                    type="text" 
                    name="name"
                    value={form.name} 
                    onChange={handleChange} 
                    required
                />
    
                <label htmlFor="Surname">Surname:</label>
                <input 
                    id="Surname" 
                    type="text" 
                    name="surname"
                    value={form.surname} 
                    onChange={handleChange} 
                    required
                />

                <label htmlFor="Email">Email:</label>
                <input 
                    id="Email" 
                    type="email" 
                    name="email"
                    value={form.email} 
                    onChange={handleChange} 
                    required
                />

                <label htmlFor="country">Country:</label>
                <input
                    id="country"
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]} 
                    required
                />

                <label htmlFor="youtubeLink">Youtube link:</label>
                <input 
                    id="youtubeLink" 
                    type="text" 
                    name="youtubeLink"
                    value={form.youtubeLink} 
                    onChange={handleChange} 
                    required
                />

                <label htmlFor="instagram">Instagram (optional):</label>
                <input 
                    id="instagram" 
                    type="text" 
                    name="instagram"
                    value={form.instagram} 
                    onChange={handleChange} 
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