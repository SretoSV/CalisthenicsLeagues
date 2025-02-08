import { serverPath } from '../../functions/serverpath';
import { useUserContext } from '../../context/UserContext';
import styles from '../../styles/ChatPageStyles/MessageCardStyle.module.css';

interface MessageCardProps{
    Id: number,
    League: number,
    Content: string,
    Datetime: Date,
    User: string,
    UserProfilePicture: string,
    IsFile: boolean
}

export function MessageCard(props: MessageCardProps){
    const { user } = useUserContext();

    return (
        <div className={styles.mainDiv}>
            <img 
                src={serverPath()+props.UserProfilePicture}
                alt="photo" 
                className={styles.athleteImage}
            />
            <div>
                <div>
                    {props.User}
                </div>
                <div>
                    {props.Content}
                </div>

            </div>
        </div>
    );
}