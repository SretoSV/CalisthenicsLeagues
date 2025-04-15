import { serverPath } from '../../functions/serverpath';
import { useUserContext } from '../../context/UserContext';
import styles from '../../styles/ChatPageStyles/MessageCardStyle.module.css';
import arrowImage from '../../images/moreArrow.png';
import { formatTime } from '../../functions/formChangeFunction';
import { useEffect, useRef, useState } from 'react';
import { MessageOptionCard } from './MessageOptionCard';
import { Message } from '../../types/MessageTypes';

interface MessageCardProps{
    Id: number,
    League: number,
    Content: string,
    Datetime: Date,
    User: string,
    UserLoggedIn: string,
    UserProfilePicture: string,
    IsFile: boolean,
    HasReply: number,
    IsDeleted: boolean,
    ReplyContent?: string,
    ReplyUser?: string,
    Messages: Message[],
    onMessageToReply: React.Dispatch<React.SetStateAction<number>>;
    onEdit: (id: number) => void
}

export function MessageCard(props: MessageCardProps){
    const { user } = useUserContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLDivElement)) {
                setIsDropdownOpen(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
        {
        user?.username === props.User ? 
            !props.IsDeleted ? 
                <div className={styles.wholeDiv1}>
                    {
                        (props.HasReply == 0) && 
                        <div className={styles.replyDiv1}>
                            {props.ReplyUser}
                            <div className={styles.contentReply}>{props.ReplyContent}</div>
                        </div>
                    }
                <div className={styles.mainDiv1}>
                    <div className={styles.contentDiv}>
                        <div className={styles.textContentDiv}>
                            {props.Content}
                        </div>
                        <div className={styles.timeAndButtonDiv} ref={dropdownRef}>
                            <button className={styles.moreButton}>
                                <img 
                                    className={styles.arrowImage}
                                    src={arrowImage} 
                                    alt="arrow" 
                                    onClick={toggleDropdown}
                                />
                            </button>
                            {isDropdownOpen && 
                                <MessageOptionCard 
                                    id={props.Id} 
                                    onEdit={props.onEdit} 
                                    onMessageToReply={props.onMessageToReply}
                                    isEditAndDeleteVisible={true}
                                    data-testid="message-option-card"
                            />}   
                            <div className={styles.timeDiv}>
                                {formatTime(props.Datetime.toString() || '')}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                :
                <div className={styles.deletedMessage}>
                    Deleted message
                </div>
            :
            !props.IsDeleted ? 
                <div className={styles.wholeDiv2}>
                    {
                        (props.HasReply == 0) && 
                        <div className={styles.replyDiv2}>
                            {props.ReplyUser}<br/>
                            <div className={styles.contentReply}>{props.ReplyContent}</div>
                        </div>
                    }
                    <div className={styles.mainDiv2}>
                        <div className={styles.nameAndContentDiv}>
                            <img 
                                src={serverPath()+props.UserProfilePicture}
                                alt="photo" 
                                className={styles.athleteImage}
                            />
                            <div>
                                <div className={styles.contentDiv}>

                                    <div className={styles.usernameAndContentDiv}>
                                        <div>
                                        {props.User}
                                        </div>
                                        <div className={styles.textContentDiv}>
                                        {props.Content}
                                        </div>
                                        
                                    </div>

                                    <div className={styles.timeAndButtonDiv} ref={dropdownRef}>
                                        <button className={styles.moreButton2}>
                                            <img 
                                                className={styles.arrowImage}
                                                src={arrowImage} 
                                                alt="arrow" 
                                                onClick={toggleDropdown}
                                            />
                                        </button>  
                                        {isDropdownOpen && 
                                            <MessageOptionCard 
                                                id={props.Id} 
                                                onEdit={props.onEdit} 
                                                onMessageToReply={props.onMessageToReply}
                                                isEditAndDeleteVisible={false}
                                                data-testid="message-option-card"
                                        />}   
                                        <div className={styles.timeDiv}>
                                            {formatTime(props.Datetime.toString() || '')}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.deletedMessage2}>
                    Deleted message
                </div>
        }
        </>
    );
}