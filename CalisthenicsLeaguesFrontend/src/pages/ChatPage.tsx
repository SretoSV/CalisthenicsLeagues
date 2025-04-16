import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "../components/NavigationComponents/Navigation";
import styles from '../styles/ChatPageStyles/ChatPageStyle.module.css';
import { serverPath } from "../functions/serverpath";
import sendImage from '../images/sendMessage.png';
import { Message } from "../types/MessageTypes";
import { MessageCard } from "../components/ChatPageComponents/MessageCard";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { formatDate, setLeagueIdByLeagueName } from "../functions/formChangeFunction";
import { FooterCard } from "../components/FooterComponents/FooterCard";
import { motion } from "framer-motion";
import socket from "../sockets/socket";

export function ChatPage(){
    const { Chat } = useParams<{ Chat: string }>();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedLeagueId, setSelectedLeagueId] = useState<number>(0);
    const [chatImage, setChatImage] = useState(serverPath()+"Images/Leagues/Beginner.png");
    const [message, setMessage] = useState("");
    const [messageToReply, setMessageToReply] = useState(0);
    const [editMessage, setEditMessage] = useState(false);
    const [editMessageId, setEditMessageId] = useState(0);
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        if(Chat != "Legendary" && Chat != "World-Class" && Chat != "Pro" && Chat != "Semi-pro" && Chat != "Amateur" && Chat != "Beginner") {
            navigate("/");
        }

        switch (Chat){
            case "Legendary":
                setChatImage(serverPath()+"Images/Leagues/Legendary.png");
                setSelectedLeagueId(1);
                break;
            case "World-Class":
                setChatImage(serverPath()+"Images/Leagues/World-Class.png");
                setSelectedLeagueId(2);
                break;
            case "Pro":
                setChatImage(serverPath()+"Images/Leagues/Pro.png");
                setSelectedLeagueId(3);
                break;
            case "Semi-pro":
                setChatImage(serverPath()+"Images/Leagues/Semi-pro.png");
                setSelectedLeagueId(4);
                break;
            case "Amateur":
                setChatImage(serverPath()+"Images/Leagues/Amateur.png");
                setSelectedLeagueId(5);
                break;
            case "Beginner":
                setChatImage(serverPath()+"Images/Leagues/Beginner.png");
                setSelectedLeagueId(6);
                break;
        }
    }, []);

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

        if(!editMessage){

            socket.invoke("SendMessage", "send_message", { 
                league: setLeagueIdByLeagueName(Chat?.toString() ?? ""),
                content: message,
                datetime: formattedDate,
                user: user?.id,
                isFile: false,
                hasReply: messageToReply,
                isDeleted: false,
            });

        }else{
            socket.invoke("EditMessage", "edit_message", { 
                id: editMessageId,
                content: message,
            });
        }

        setEditMessage(false);
        setMessage("");
        setMessageToReply(0);
        setEditMessageId(0);
    };

    useEffect(() => {
        socket.start().then(() => {
            console.log("Connected to WebSocket");

            socket.on("send_message", (data: any) => {
                console.log("Primljen event send:", data);

                console.log("Primljen newMessage send:", data);
                setMessages((currentState) => [...currentState, data]);
            });
    
            socket.on("edit_message", (data: any) => {
                console.log("Primljen event edit:", data);
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                      msg.id === data.id ? { ...msg, content: data.content } : msg
                    )
                );
            });

            socket.on("delete_message", (data: any) => {
                console.log("Primljen event delete:", data);
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                      msg.id === data ? { ...msg, isDeleted: true, content: "Deleted message" } : msg
                    )
                );
            });
        });
    
        return () => {
            socket.off("send_message");
            socket.off("edit_message");
            socket.off("delete_message");
        };
    }, []);

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
                    //console.log(data);
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
                else{
                    const data = await response.json();
                    if(data.league > setLeagueIdByLeagueName(Chat?.toString() ?? "")){
                        navigate('/LeaguesPage');
                    }
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
                                    <a href="Beginner" className={styles.chatsA}><button className={styles.chats}>Beginner</button></a>
                                    :
                                    <a href="Beginer" className={styles.chatsA}><button className={styles.chats} disabled>Beginner</button></a>
                                }
                                {
                                    (user && user?.league <= 5) ? 
                                    <a href="Amateur" className={styles.chatsA}><button className={styles.chats}>Amateur</button></a>
                                    :
                                    <a href="Amateur" className={styles.chatsA}><button className={styles.chats} disabled>Amateur</button></a>
                                }
                                {
                                    (user && user?.league <= 4) ? 
                                    <a href="Semi-pro" className={styles.chatsA}><button className={styles.chats}>Semi-pro</button></a>
                                    :
                                    <a href="Semi-pro" className={styles.chatsA}><button className={styles.chats} disabled>Semi-pro</button></a>
                                }
                                {
                                    (user && user?.league <= 3) ? 
                                    <a href="Pro" className={styles.chatsA}><button className={styles.chats}>Pro</button></a>
                                    :
                                    <a href="Pro" className={styles.chatsA}><button className={styles.chats} disabled>Pro</button></a>
                                }
                                {
                                    (user && user?.league <= 2) ? 
                                    <a href="World-Class" className={styles.chatsA}><button className={styles.chats}>World-Class</button></a>
                                    :
                                    <a href="World-Class" className={styles.chatsA}><button className={styles.chats} disabled>World-Class</button></a>
                                }
                                {
                                    (user && user?.league <= 1) ? 
                                    <a href="Legendary" className={styles.chatsA}><button className={styles.chats}>Legendary</button></a>
                                    :
                                    <a href="Legendary" className={styles.chatsA}><button className={styles.chats} disabled>Legendary</button></a>
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
                                            <b>{Chat} - group chat</b>
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