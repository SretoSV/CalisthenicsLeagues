import styles from '../../styles/ChatPageStyles/MessageOptionCardStyle.module.css';
import socket from "../../sockets/socket";

interface MessageOptionCardProps{
    id: number,
    onChange: React.Dispatch<React.SetStateAction<boolean>>;
    onMessageToReply: React.Dispatch<React.SetStateAction<number>>;
    onEdit: (id: number) => void,
    isEditAndDeleteVisible: boolean,
}

export function MessageOptionCard(props: MessageOptionCardProps){

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onEdit(props.id);
        props.onMessageToReply(0);
    } 
    const handleReply = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onMessageToReply(props.id);
        props.onEdit(0);
    } 

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
       
        socket.invoke("DeleteMessage", "delete_message", { 
            id: props.id,
            content: "",
        });
    } 

    return (
        props.isEditAndDeleteVisible ? 
        <div data-testid="message-option-card" className={styles.dropdownStyle}>
            <button 
                className={`${styles.buttons} ${styles.marginStyle}`}
                onClick={(e) => handleEdit(e)}
            >
                Edit
            </button>
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
        :
        <div data-testid="message-option-card" className={styles.dropdownStyle}>
            <button 
                className={`${styles.buttons} ${styles.marginStyle}`}
                onClick={(e) => handleReply(e)}
            >
                Reply
            </button>
        </div>
    );
}