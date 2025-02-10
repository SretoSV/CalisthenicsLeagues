import { useEffect, useRef, useState } from "react";
import { Navigation } from "../components/NavigationComponents/Navigation";
import styles from '../styles/ChatPageStyles/ChatPageStyle.module.css';
import { serverPath } from "../functions/serverpath";
import sendImage from '../images/sendMessage.png';
import { Message } from "../types/MessageTypes";
import { MessageCard } from "../components/ChatPageComponents/MessageCard";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export function ChatPage(){
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedLeagueId, setSelectedLeagueId] = useState(6);
    const [chatImage, setChatImage] = useState(serverPath()+"Images/Leagues/Begginer.png");
    const [chatName, setChatName] = useState("Begginer");
    const [message, setMessage] = useState("");
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleClick = (chat: string) => {
        switch (chat){
            case "Legendary":
                setChatImage(serverPath()+"Images/Leagues/Legendary.png");
                setChatName("Legendary");
                setSelectedLeagueId(1);
                break;
            case "World-Class":
                setChatImage(serverPath()+"Images/Leagues/World-Class.png");
                setChatName("World-Class");
                setSelectedLeagueId(2);
                break;
            case "Pro":
                setChatImage(serverPath()+"Images/Leagues/Pro.png");
                setChatName("Pro");
                setSelectedLeagueId(3);
                break;
            case "Semi-pro":
                setChatImage(serverPath()+"Images/Leagues/Semi-pro.png");
                setChatName("Semi-pro");
                setSelectedLeagueId(4);
                break;
            case "Amateur":
                setChatImage(serverPath()+"Images/Leagues/Amateur.png");
                setChatName("Amateur");
                setSelectedLeagueId(5);
                break;
            case "Begginer":
                setChatImage(serverPath()+"Images/Leagues/Begginer.png");
                setChatName("Begginer");
                setSelectedLeagueId(6);
                break;
        }
    }

    const handleSubmit = () => {

    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${serverPath()}Chat/all/${selectedLeagueId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                } else {
                    console.error('Error fetching messages:', response.status, response.statusText);
                }
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchMessages();
    }, [selectedLeagueId]);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await fetch(`${serverPath()}User/me`,{
                    method: 'GET', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.status === 204) {
                    navigate('/LeaguesPage');
                } 
            } 
            catch (err: unknown) {
                if (err instanceof Error) {
                    alert(err?.message || 'Unknown error');
                }
                else {
                    alert('Unknown error');
                }
            }
        };

        fetchMe();
    }, []);

    // automatsko skorolovanje na dno kada je dosla nova poruka
    const messagesDivRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesDivRef.current) {
            messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
        }
    }, [messages]);

    return(
        <>
            <Navigation isApplyPage={false}/>
            <div className={styles.mainDiv}>
                <div className={styles.mainDiv2}>
                    <div className={styles.mainDiv3}>
                        {
                            (user && user?.league <= 6) ? 
                            <button onClick={() => handleClick("Begginer")} className={styles.chats}>Begginer</button>
                            :
                            <button onClick={() => handleClick("Begginer")} className={styles.chats} disabled>Begginer</button>
                        }
                        {
                            (user && user?.league <= 5) ? 
                            <button onClick={() => handleClick("Amateur")} className={styles.chats}>Amateur</button>
                            :
                            <button onClick={() => handleClick("Amateur")} className={styles.chats} disabled>Amateur</button>
                        }
                        {
                            (user && user?.league <= 4) ? 
                            <button onClick={() => handleClick("Semi-pro")} className={styles.chats}>Semi-pro</button>
                            :
                            <button onClick={() => handleClick("Semi-pro")} className={styles.chats} disabled>Semi-pro</button>
                        }
                        {
                            (user && user?.league <= 3) ? 
                            <button onClick={() => handleClick("Pro")} className={styles.chats}>Pro</button>
                            :
                            <button onClick={() => handleClick("Pro")} className={styles.chats} disabled>Pro</button>
                        }
                        {
                            (user && user?.league <= 2) ? 
                            <button onClick={() => handleClick("World-Class")} className={styles.chats}>World-Class</button>
                            :
                            <button onClick={() => handleClick("World-Class")} className={styles.chats} disabled>World-Class</button>
                        }
                        {
                            (user && user?.league <= 1) ? 
                            <button onClick={() => handleClick("Legendary")} className={styles.chats}>Legendary</button>
                            :
                            <button onClick={() => handleClick("Legendary")} className={styles.chats} disabled>Legendary</button>
                        }
                    </div>
                    <div className={styles.chat}>
                            <div className={styles.imageAndNameOfChat}>
                                <img 
                                    src={chatImage} 
                                    alt="ChatImage" 
                                    className={styles.leagueImage}
                                />
                                <div>
                                    <b>{chatName} - group chat</b>
                                </div>
                            </div>
                            <div className={styles.messagesDiv}  ref={messagesDivRef}>

                                {messages.map((message) => {
                                    return <MessageCard 
                                                key={message.id}
                                                Id={message.id}
                                                League={message.league}
                                                Content={message.content}
                                                Datetime={message.datetime}
                                                User={message.user}
                                                UserProfilePicture={message.userProfilePicture}
                                                IsFile={message.isFile}
                                            />
                                })}

                            </div>

                            <div className={styles.addMessageDiv}>
                                <textarea
                                    id="messageArea"
                                    className={styles.addMessageTextArea}
                                    placeholder="Message..."
                                    value={message}
                                    onChange={handleTextChange}
                                    required
                                ></textarea>
                                <button
                                type="submit"
                                className={styles.addMessageButton}
                                title="Send"
                                onClick={() => handleSubmit()}
                                >
                                    <img
                                        src={sendImage}
                                        alt="Send"
                                        className={styles.buttonImage}
                                    />
                                </button>
                            </div>

                    </div>
                </div>
            </div>
        </>
    );
}