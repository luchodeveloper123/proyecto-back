import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './chatdetails.css';

function ChatDetails() {
    const { chatId } = useParams();
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const fetchSelectedChat = async () => {
            const chatDatabase = {
                1: {
                    chatName: 'Lisa',
                    chatMessages: [
                        { sender: 'Lisa', content: '¿Ya terminaste la tarea?' },
                        { sender: 'Tú', content: 'No, ¿y tú?' }
                    ],
                },
                2: {
                    chatName: 'Homero',
                    chatMessages: [
                        { sender: 'Homero', content: 'Mmm... rosquillas' },
                        { sender: 'Tú', content: 'Qué ricas' }
                    ],
                },
                3: {
                    chatName: 'Flanders',
                    chatMessages: [
                        { sender: 'Flanders', content: '¡Hola, vecino!' },
                        { sender: 'Tú', content: 'Hola, Flanders' }
                    ],
                },
                4: {
                    chatName: 'Marge',
                    chatMessages: [
                        { sender: 'Marge', content: 'Recuerda llevar el almuerzo.' },
                        { sender: 'Tú', content: 'Gracias por recordármelo' }
                    ],
                },
            };

            const data = chatDatabase[chatId];
            setSelectedChat(data);
        };

        fetchSelectedChat();
    }, [chatId]);

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (messageInput.trim() === '') return;

        const updatedChatMessages = [
            ...selectedChat.chatMessages,
            { sender: 'Tú', content: messageInput }
        ];

        setSelectedChat((prevData) => ({
            ...prevData,
            chatMessages: updatedChatMessages,
        }));

        setMessageInput('');
    };

    if (!selectedChat) {
        return <div className="chat-loading">Cargando chat...</div>;
    }

    return (
        <div className="chat-container">
            <h2 className="chat-header">Chat con {selectedChat.chatName}</h2>
            <div className="chat-messages-container">
                {selectedChat.chatMessages.map((message, index) => (
                    <div key={index} className="chat-message-item">
                        <strong>{message.sender}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-form">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="chat-input"
                />
                <button type="submit" className="chat-send-button">Enviar</button>
            </form>
        </div>
    );
}

export default ChatDetails;





