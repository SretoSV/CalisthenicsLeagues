import styles from '../styles/EditProfilePageStyles/EditProfilePageStyle.module.css';
import { useEffect, useState } from "react";
import placeHolder from '../images/placeHolder.png';

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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
      name:'',
      surname:'',
      country: '',
      email: '',
      username:'',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  } 

    const [countries, setCountries] = useState<Country[]>([]);
    const [profilePicture, setProfilePicture] = useState(placeHolder);
    const [message, setMessage] = useState('');

    useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching countries:", error));
    }, []);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(form);
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
          <h1>Izmena naloga</h1>
          <div className={styles.formContent}>
            <div className={styles.formLeft}>
              <label htmlFor="name">Ime</label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                autoComplete="off"
                required
              />

              <label htmlFor="surname">Prezime</label>
              <input
                id="surname"
                type="text"
                name="surname"
                onChange={handleChange}
                autoComplete="off"
                required
              />
              


              <label htmlFor="country">Država</label>
              <input
                id="country"
                type="text"
                name="country"
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
                onChange={handleChange}
                autoComplete="off"
                required
                disabled
              />

              <label htmlFor="username">Korisničko ime</label>
              <input
                id="username"
                type="text"
                name="username"
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
                src={profilePicture || placeHolder}
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