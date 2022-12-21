import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import './styles.css';
import { auth } from '../../firebase';

function MessageList({ roomId }) {
    const containerRef = React.useRef(null);
    const { user } = useAuth();
    const messages = useMessages(roomId);

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
        <div className="message-list-container" ref={containerRef}>
            <ul className="message-list">
                {messages.map((x) => (
                    <Message
                        message={x}
                        isOwnMessage={x.uid === user.uid}
                        // ProfilePic={user.photoUrl}
                    />
                ))}
            </ul>
        </div>
    );
}

function Message({ message, isOwnMessage }) {
    const { displayName, text, } = message;
    return (

        <li className={['message', isOwnMessage && 'own-message'].join(' ')}> 
            <div className={`message ${isOwnMessage}`}>
            {/* <img src={currentUser.displayName} alt="loading..." srcset="" /> */}
            <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4><br />
            <span>{text}</span></div>
        </li>
    );
}

export { MessageList };
