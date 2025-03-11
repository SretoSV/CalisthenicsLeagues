import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "../components/NavigationComponents/Navigation";
import styles from '../styles/ChatPageStyles/ChatPageStyle.module.css';
import { serverPath } from "../functions/serverpath";
import sendImage from '../images/sendMessage.png';
import { Message } from "../types/MessageTypes";
import { MessageCard } from "../components/ChatPageComponents/MessageCard";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { formatDate, setLeagueIdByLeagueName } from "../functions/formChangeFunction";
import { FooterCard } from "../components/FooterComponents/FooterCard";
import { motion } from "framer-motion";

export function ChatPage(){
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedLeagueId, setSelectedLeagueId] = useState(6);
    const [chatImage, setChatImage] = useState(serverPath()+"Images/Leagues/Begginer.png");
    const [chatName, setChatName] = useState("Begginer");
    const [message, setMessage] = useState("");
    const [messageToReply, setMessageToReply] = useState(0);
    const [change, setChange] = useState(true);
    const [editMessage, setEditMessage] = useState(false);
    const [editMessageId, setEditMessageId] = useState(0);
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

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const now = new Date();
        //const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
        const formattedDate = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');
        let messageData;
        let fetchString;

        if(!editMessage){
            messageData = {
                league: setLeagueIdByLeagueName(chatName),
                content: message,
                datetime: formattedDate,
                user: user?.id,
                isFile: false,
                hasReply: messageToReply,
                isDeleted: false,
            };
            fetchString = `${serverPath()}Chat/newMessage`;
        }else{
            messageData = {
                id: editMessageId,
                content: message,
            };
            fetchString = `${serverPath()}Chat/edit`;
        }
        
        try {
            const response = await fetch(fetchString, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error("Message send failed");
            }
            else{
                //const result = await response.json();
                setChange(current => !current);
            }

        } catch (error) {
            console.error("Error submitting message:", error);
        }

        setEditMessage(false);
        setMessage("");
        setMessageToReply(0);
        setEditMessageId(0);
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
    }, [selectedLeagueId, change]);

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

    const handleEdit = (id: number) => {
        if(id !== 0){
            setEditMessageId(id);
            setEditMessage(true);
            messages.map((message) => {
                if(message.id === id){
                    setMessage(message.content);
                }
            }
            )
        }
        else{
            setEditMessageId(0);
            setEditMessage(false);
            setMessage("");
        }
    } 

    return(
        <>
            <div className={styles.wrapper}>
                <div>
                    <Navigation isApplyPage={false}/>
                    <motion.div 
                        className={styles.mainDiv}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut"}}
                        /*transition={{ type: "spring", stiffness: 100, damping: 5 }}*/
                    >
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

                                        {messages.map((message, index) => {

                                                return <React.Fragment key={message.id}>
                                                    {
                                                        (index != 0) 
                                                        ?
                                                            (formatDate(message.datetime.toString()) !== formatDate(messages[index-1].datetime.toString()))
                                                            &&
                                                            <div key={index} className={styles.dateDiv}>
                                                                {formatDate(message.datetime.toString())}
                                                            </div>
                                                        :
                                                            <div key={index} className={styles.dateDiv}>
                                                                {formatDate(message.datetime.toString())}
                                                            </div>
                                                    }

                                                    <MessageCard 
                                                        key={message.id}
                                                        Id={message.id}
                                                        League={message.league}
                                                        Content={message.content}
                                                        Datetime={message.datetime}
                                                        User={message.user}
                                                        UserLoggedIn={user?.username || ''}
                                                        UserProfilePicture={message.userProfilePicture}
                                                        IsFile={message.isFile}
                                                        HasReply={message.hasReply}
                                                        IsDeleted={message.isDeleted}
                                                        ReplyContent={message.replyContent}
                                                        ReplyUser={message.replyUser}
                                                        Messages={messages}
                                                        onMessageToReply={setMessageToReply}
                                                        onChange={setChange}
                                                        onEdit={handleEdit}
                                                    />
                                                </React.Fragment>
                                        })}

                                    </div>

                                    {
                                        (messageToReply > 0) && 
                                        messages.map((message) => {
                                            if(message.id === messageToReply){
                                                return <div key={message.id} className={styles.messageToReplyDiv}>
                                                    <div className={styles.textContentDiv}>
                                                        <b>{message.user}</b><br/>
                                                        {message.content}
                                                    </div>
                                                    <button 
                                                        onClick={() => (setMessageToReply(0))}
                                                        className={styles.deleteReplyMessageButton}
                                                        >
                                                        X
                                                    </button>
                                                </div>
                                            }
                                        })
                                    }
                                    {
                                        (editMessage) &&
                                        <div className={styles.messageToReplyDiv}>
                                            <div>
                                                Editing...
                                            </div>
                                            <button 
                                                onClick={() => (setEditMessage(false))}
                                                className={styles.deleteReplyMessageButton}
                                                >
                                                X
                                            </button>
                                        </div>
                                    }
                                    <div className={styles.addMessageDiv}>
                                        <textarea
                                            id="messageArea"
                                            className={styles.addMessageTextArea}
                                            placeholder="Message..."
                                            value={message}
                                            onChange={handleTextChange}
                                            required
                                        ></textarea>
                                        {
                                            (message === "") ? 
                                            <button
                                            type="submit"
                                            className={styles.addMessageButtonDisabled}
                                            title="Send"
                                            >
                                                <img
                                                    src={sendImage}
                                                    alt="Send"
                                                    className={styles.buttonImage}
                                                />
                                            </button>
                                            :
                                            <button
                                            type="submit"
                                            className={styles.addMessageButton}
                                            title="Send"
                                            onClick={(e) => handleSubmit(e)}
                                            >
                                                <img
                                                    src={sendImage}
                                                    alt="Send"
                                                    className={styles.buttonImage}
                                                />
                                            </button>
                                        }

                                    </div>

                            </div>
                        </div>
                    </motion.div>
                </div>
                <FooterCard />
            </div>
        </>
    );
}