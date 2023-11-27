import React from 'react';
import styles from './welcome.module.scss';
interface Props {

}

const Welcome = (props: Props) => {


    return (
        <div className={styles.welcomeWrpGridRows}>
            <h1 className={styles.welcomeTitle}>{'Hello'} <b>{'User'}</b></h1>
            <div className={styles.welcomeMainGridRowArea}>
                <p>{'We are happy to welcome you to The First Clicks family!'}</p>
                <p>{'You already made your first clicks to land here so let’s get started collecting your visitors and customers first clicks. 😎'}</p>
                <p><a className={styles.welcomeUpdateButton} href={'/profile'} title={''}>{'Update your profile,'}</a>{' so your teams can easily reconize you.'}</p>
            </div>
            <div className={styles.welcomeSectionsGridRowArea}>
                <div className={` ${styles.welcomeSectionColumns} ${styles.welcomeSectionColumns1}`}>
                    <h4>{'Free Trial'}</h4>
                    <h2>{'Start monitoring'}</h2>
                    <p>{'Your 14-day free trial will start when you set up your first experiment!\n' +
                    'Make sure you set up all monitors allowed so you benefit the most and enjoy your first click experience.'}</p>
                    <p>{'Install our snippet on your website or web app to track real-time first click metrics. Get to know your users first intention and analyse behaviour. '}</p>
                    <a href={'/create-project'} className={`buttonsTFC  primaryBtn ${styles.welcomeBtn}`}>
                        {'Create a project'}
                        <i className={'ico-plus-ico'} />
                    </a>
                </div>
                <div className={`formsTFC ${styles.welcomeSectionColumns} ${styles.welcomeSectionColumns2}`}>
                    {/* <h4>{'Invite teammates to your account'}</h4>

                    <div className={`formsTFC  ${styles.welcomeForm}`}>
                       <small>{'Add email addresses to invite'}</small>
                        <TextAreaTags showButtonSent={false} hasCallback={true} hasUserCallback={hasUser} />
                    </div>
                    <button className={`buttonsTFC  ${styles.buttonInvite} ${invite}-valid-error-class`}>
                        {'Invite'}
                        <i className={'ico-plus-ico'} />
                    </button>    */}
                </div>
            </div>
    </div>)
};

export default Welcome;
