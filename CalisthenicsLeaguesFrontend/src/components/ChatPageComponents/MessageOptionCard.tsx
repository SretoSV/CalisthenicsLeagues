import { serverPath } from '../../functions/serverpath';
import styles from '../../styles/ChatPageStyles/MessageOptionCardStyle.module.css';
interface MessageOptionCardProps{
    id: number,
    onChange: React.Dispatch<React.SetStateAction<boolean>>;
    onMessageToReply: React.Dispatch<React.SetStateAction<number>>;
}

export function MessageOptionCard(props: MessageOptionCardProps){

    const handleReply = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onMessageToReply(props.id);
    } 

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${serverPath()}Chat/delete/${props.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                });

                if (response.ok) {
                    props.onChange(current => !current);
                } 
                else {
                    console.log("An error occurred while processing the request.");
                }
            } 
        catch (error) {
            console.error("Server error! Try again later...");
        }
    } 

    return (
        <div className={styles.dropdownStyle}>
            <button className={`${styles.buttons} ${styles.marginStyle}`}>Edit</button>
            <button 
                    className={`${styles.buttons} ${styles.marginStyle}`}
                    onClick={(e) => handleReply(e)}
                >
                    Reply
                </button>
            <button 
                className={styles.buttons}
                onClick={(e) => handleDelete(e)}
            >
                Delete
            </button>
        </div>
    );
}