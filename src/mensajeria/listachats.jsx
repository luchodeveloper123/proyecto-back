import React from 'react';
import './listachats.css';
import { Link } from 'react-router-dom';
import homeroImg from '../img/homero.jpg';
import flandersImg from '../img/flanders.jpg';
import lisaImg from '../img/lisa.jpg';
import margeImg from '../img/marge.jpg';

function ChatCard({ chatId, chatName, chatMessage, chatTime, chatImage }) {
    return (
        <Link to={`/chat/${chatId}`} className="chat-card-link">
            <div className="chat-card">
                <img src={chatImage} alt={`Foto de ${chatName}`} className="chat-card-image" />
                <div className="chat-card-details">
                    <div className="chat-card-header">
                        <span className="chat-card-name">{chatName}</span>
                        <span className="chat-card-time">{chatTime}</span>
                    </div>
                    <div className="chat-card-message">{chatMessage}</div>
                </div>
            </div>
        </Link>
    );
}

function ChatList() {
    const chatData = [
        { chatId: 1, chatName: 'Lisa', chatMessage: '¿Ya terminaste la tarea?', chatTime: '5 minutos', chatImage: lisaImg },
        { chatId: 2, chatName: 'Homero', chatMessage: 'Mmm... rosquillas', chatTime: '10 minutos', chatImage: homeroImg },
        { chatId: 3, chatName: 'Flanders', chatMessage: '¡Hola, vecino!', chatTime: '2 días', chatImage: flandersImg },
        { chatId: 4, chatName: 'Marge', chatMessage: 'Recuerda llevar el almuerzo.', chatTime: '2 horas', chatImage: margeImg },
    ];

    return (
        <div className="chat-list">
            {chatData.map((chat) => (
                <ChatCard
                    key={chat.chatId}
                    chatId={chat.chatId}
                    chatName={chat.chatName}
                    chatMessage={chat.chatMessage}
                    chatTime={chat.chatTime}
                    chatImage={chat.chatImage}
                />
            ))}
        </div>
    );
}

export default ChatList;





