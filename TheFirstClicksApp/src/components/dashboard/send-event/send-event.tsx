import React from 'react';
import styles from './send-event.module.scss';

const SideEvent = ({url}) => {
    return(
        <section className={styles.sendSideEventWrapper}>
            <i className={styles.brandingIcon}>{}</i>
            <small className={styles.branding}>{url}</small>
        </section>
    )
};
export default SideEvent;
