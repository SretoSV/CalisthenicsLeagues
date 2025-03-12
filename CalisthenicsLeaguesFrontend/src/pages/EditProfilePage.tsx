import styles from '../styles/EditProfilePageStyles/EditProfilePageStyle.module.css';
import { useEffect, useState } from "react";
import { useUserContext } from '../context/UserContext';
import { serverPath } from '../functions/serverpath';
import { useNavigate } from 'react-router-dom';
import { useCountriesContext } from '../context/CountriesContext';
import { formatDate, handleInputChange } from '../functions/formChangeFunction';

export function EditProfilePage(){
  const navigate = useNavigate();
  const { user, login } = useUserContext();
  const { countries } = useCountriesContext();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    surname: '',
    country: '',
    email: '',
    dateOfBirth: '',
    instagram: '',
    username: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append("id", user?.id.toString() || "");
    formData.append("username", form.username);
    formData.append("name", form.name);
    formData.append("surname", form.surname);
    formData.append("country", form.country);
    formData.append("email", form.email);
    formData.append("dateOfBirth", form.dateOfBirth);
    formData.append("instagram", form.instagram);
    formData.append("league", user?.league.toString() || "");

    if (imageFile) {
      formData.append("profileImage", imageFile);
    }
  
    try {
      const response = await fetch(`${serverPath()}User/edit`, {
        method: 'POST',
        body: formData,
        credentials: "include",
      });
  
      if (response.ok) {
        const userData = await response.json();
        login(userData);
        setMessage("Profile edited successfully.");
      } else {
        setMessage('Invalid data.');
      }
    } catch (err) {
      setMessage('Server error. Try again later.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setForm({
        name: user?.name || '',
        surname: user?.surname || '',
        country: user?.country || '',
        email: user?.email || '',
        instagram: user?.instagram || '',
        username: user?.username || '',
        dateOfBirth: formatDate(user?.dateOfBirth || ''),
      });
    }
    else{
      navigate('/LeaguesPage');
    }
  }, [user]);

  return (
    <div className={styles.mainDiv}>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        
          <h1>Edit profile</h1>
          <div className={styles.formImage}>
            <img
              className={styles.profilePicture}
              src={serverPath()+user?.image}
              alt="Profilna slika"
            />
            <input 
              id="imageUpload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className={styles.hiddenFileInput}
            />
          </div>

          <div className={styles.formInputs}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={form.name}
              onChange={(e) => handleInputChange(e, setForm)}
              autoComplete="off"
              required
            />

            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              name="surname"
              defaultValue={form.surname}
              onChange={(e) => handleInputChange(e, setForm)}
              autoComplete="off"
              required
            />

            <label htmlFor="country">Country</label>
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

            <label htmlFor="instagram">Instagram</label>
            <input
              id="instagram"
              type="text"
              name="instagram"
              defaultValue={form.instagram}
              onChange={(e) => handleInputChange(e, setForm)}
              autoComplete="off"
              required
            />
            
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@gmail.com"
              name="email"
              defaultValue={form.email}
              onChange={(e) => handleInputChange(e, setForm)}
              autoComplete="off"
              required
              disabled
            />
            
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input 
              id="dateOfBirth"
              type="date" 
              name="dateOfBirth"
              defaultValue={form.dateOfBirth || ""} 
              onChange={(e) => handleInputChange(e, setForm)}
              max={new Date().toISOString().split("T")[0]} 
              required
            />

            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={form.username}
              onChange={(e) => handleInputChange(e, setForm)}
              autoComplete="off"
              required
              disabled
            />
          </div>

        {message && <p className={styles.message}>{message}</p>}
        <button className={styles.submitButton}>Edit</button>
      </form>
    </div>
  );
}