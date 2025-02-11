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
    Messages: Message[],
    onChange: React.Dispatch<React.SetStateAction<boolean>>;
    onMessageToReply: React.Dispatch<React.SetStateAction<number>>;
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
            <div className={styles.wholeDiv1}>
                {
                    (props.HasReply > 0) && 
                    props.Messages.map((message) => {
                        if(message.id === props.HasReply){
                            return <div className={styles.replyDiv1}>
                                {message.user}
                                <div className={styles.contentReply}>{message.content}</div>
                            </div>
                        }
                    })
                }
            <div className={styles.mainDiv1}>
                <div className={styles.contentDiv}>
                    <div>
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
                        {isDropdownOpen && <MessageOptionCard id={props.Id} onChange={props.onChange} onMessageToReply={props.onMessageToReply}/>}   
                        <div className={styles.timeDiv}>
                            {formatTime(props.Datetime.toString() || '')}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            :
            <div className={styles.wholeDiv2}>
                {
                    (props.HasReply > 0) && 
                    props.Messages.map((message) => {
                        if(message.id === props.HasReply){
                            return <div className={styles.replyDiv2}>
                                {message.user}<br/>
                                <div className={styles.contentReply}>{message.content}</div>
                            </div>
                        }
                    })
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
                                    <div>
                                    {props.Content}
                                    </div>
                                    
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
                                {isDropdownOpen && <MessageOptionCard id={props.Id} onChange={props.onChange} onMessageToReply={props.onMessageToReply}/>}   
                                    <div className={styles.timeDiv}>
                                        {formatTime(props.Datetime.toString() || '')}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}