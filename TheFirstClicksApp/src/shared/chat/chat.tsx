import React from 'react';
import styles from './chat.module.scss';

interface Props {
    
}

const Chat = (props: Props) => {

    return (<div className={styles.chatWrraper}>
        <p><img src="/assets/img/chat.svg" alt={'chat'} /></p>
    </div>);
  };

export default Chat;