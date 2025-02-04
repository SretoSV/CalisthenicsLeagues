import { useEffect, useState } from 'react';
import styles from '../../styles/ApplyPageStyles/ApplyPageStyle.module.css';

interface ApplyModalProps {
    show: boolean,
    onClose: () => void; // Funkcija bez argumenata koja ne vraća ništa
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

export default function ApplyModal({ onClose, show }: ApplyModalProps) {
    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching countries:", error));
    }, []);

    const [form, setForm] = useState({
        username: '',
        name: '',
        password: '',
        surname: '',
        email: '',
        country: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
        setForm({
          ...form,
          [e.target.name]: e.target.value, 
        });
    }

    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    if (!show) return null;

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!videoFile) {
            alert("Please upload a video file.");
            return;
        }
        console.log("Submitted:", form.name, form.surname, form.email, videoFile );
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setVideoFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setVideoFile(null);
    };

    return (
        <form className={styles.modalOverlay} onSubmit={handleSubmit}>
            <div className={styles.modalContent}>
            <div>
                Enter your information to be able to log in, if your application is accepted.
            </div>
            <br />
            <div className={styles.formModal}>
                <label htmlFor="Username">Username:</label>
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

                <label htmlFor="Upload">Upload video:</label>
                {!videoFile && (
                    <div className={styles.customFileUpload}>
                        <label htmlFor="videoUpload" className={styles.uploadButton}>
                            Choose File
                        </label>
                        <input 
                            id="videoUpload" 
                            type="file" 
                            accept="video/*" 
                            onChange={handleFileChange} 
                            className={styles.hiddenFileInput}
                        />
                    </div>
                )}
                <div 
                    className={`${styles.dragDropArea} ${dragActive ? styles.active : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {videoFile ? (
                        <div>
                            <p>File: {videoFile.name}</p>
                            <button 
                                type="button" 
                                className={styles.removeFileButton} 
                                onClick={handleRemoveFile}
                            >
                                X
                            </button>
                        </div>
                    ) : (
                        <p>Drag and drop a video file here or choose file</p>
                    )}
                </div>
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