import styles from '../styles/EditProfilePageStyles/EditProfilePageStyle.module.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/UserContext';
import { serverPath } from '../functions/serverpath';
import { useNavigate } from 'react-router-dom';

interface Country {
    name: {
      common: string;
    };
    flags: {
      png: string;
      svg: string;
    };
  }

export function EditProfilePage(){
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  if (!userContext) {
      throw new Error("UserContext must be used within a UserProvider.");
  }
  const { user, login } = userContext;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [message, setMessage] = useState('');
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dateString.split('T')[0]; // Uzimanje samo "YYYY-MM-DD" dela
  };
  
  const [form, setForm] = useState({
    name: '',
    surname: '',
    country: '',
    email: '',
    dateOfBirth: '',
    instagram: '',
    username: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  } 

    useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching countries:", error));
    }, []);

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
      formData.append("league", user?.league || "");

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
          setImageFile(e.target.files[0]);
      }
    };

    return (
      <div className={styles.mainDiv}>
        <form className={styles.editForm} onSubmit={handleSubmit}>
          <h1>Edit profile</h1>
          <div className={styles.formContent}>
            <div className={styles.formLeft}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                defaultValue={form.name}
                onChange={handleChange}
                autoComplete="off"
                required
              />

              <label htmlFor="surname">Surname</label>
              <input
                id="surname"
                type="text"
                name="surname"
                defaultValue={form.surname}
                onChange={handleChange}
                autoComplete="off"
                required
              />

              <label htmlFor="country">Country</label>
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

              <label htmlFor="instagram">Instagram</label>
              <input
                id="instagram"
                type="text"
                name="instagram"
                defaultValue={form.instagram}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} 
                required
              />

              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                defaultValue={form.username}
                onChange={handleChange}
                autoComplete="off"
                required
                disabled
              />
            </div>

            <div className={styles.divider}></div>
            <div className={styles.formRight}>
              <div>Profile Image</div>
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
          </div>

          {message && <p className={styles.message}>{message}</p>}
          <button className={styles.submitButton}>Edit</button>
        </form>
      </div>
    );
}