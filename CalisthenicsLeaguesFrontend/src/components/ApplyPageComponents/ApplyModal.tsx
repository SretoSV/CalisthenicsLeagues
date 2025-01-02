import { useState } from 'react';
import styles from '../../styles/ApplyPageStyle.module.css';

interface ApplyModalProps {
    show: boolean,
    onClose: () => void; // Funkcija bez argumenata koja ne vraća ništa
}

export default function ApplyModal({ onClose, show }: ApplyModalProps) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
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
        console.log("Submitted:", { name, surname, email, videoFile });
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
            <div className={styles.formModal}>
                <label htmlFor="Name">Name:</label>
                <input 
                    id="Name" 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
    
                <label htmlFor="Surname">Surname:</label>
                <input 
                    id="Surname" 
                    type="text" 
                    value={surname} 
                    onChange={(e) => setSurname(e.target.value)} 
                    required
                />

                <label htmlFor="Email">Email:</label>
                <input 
                    id="Email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
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