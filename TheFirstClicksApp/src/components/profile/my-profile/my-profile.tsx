import React, {useCallback, useState} from 'react';
import styles from './my-profile.module.scss';
import {InputsHtmlTypes} from '../../inputs/Inputs';

const MyProfile = () => {
    const [user, setUser] = useState<any>({
        name: '',
        lastname: '',
        possition: '',
        timezone: '',
        upload: ''

    });

    const handleSaveProfile = useCallback(() => {
     ///console.log('user save ', user);

    }, [user]);

    const handleOnChange = useCallback((event: any) => {
       
         const {value, name} = event.target;
      /// console.log(value, name, 'value name');
       setUser({...user, [name]: value});
        //TODO valid all props
      
     }, [user]);

    return (<div className={styles.MyProfileWrraper}>
        <h1>{'My Profile'}</h1>
        <div className={`formTFCborder ${styles.formProfile}`}>
                         <h2 className={styles.formProfilePicture}>
                         <InputsHtmlTypes
                            type={'file'}
                            name={'upload'}
                            id={'upload'}
                            label={'upload'}
                    
                            value={user.upload}
                            onChange={handleOnChange}
                        />
                         </h2>
                        <div className={styles.infoMyProfile}>
                            <InputsHtmlTypes
                                type={'text'}
                                name={'name'}
                                id={'name'}
                                label={'First name'}
                                isRequired={true}
                                value={user.name}
                                onChange={handleOnChange}
                                classStyle={'primaryInputHolder'}
                            />
                            <InputsHtmlTypes
                                type={'text'}
                                name={'lastname'}
                                id={'lastname'}
                                label={'Last name'}
                                isRequired={true}
                                value={user.lastname}
                                onChange={handleOnChange}
                                classStyle={'primaryInputHolder'}
                            />
                            <InputsHtmlTypes
                                type={'text'}
                                name={'possition'}
                                id={'possition'}
                                label={'Job possition'}
                                isRequired={true}
                                value={user.possition}
                                onChange={handleOnChange}
                                classStyle={'primaryInputHolder'}
                            />
                            <InputsHtmlTypes
                                type={'datetime-local'}
                                name={'timezone'}
                                id={'timezone'}
                                label={'timezone'}
                                isRequired={true}
                                value={user.timezone}
                                onChange={handleOnChange}
                                classStyle={'primaryInputHolder'}
                            />
                            
                            <button onClick={handleSaveProfile} className={`buttonsTFC mainBtn`}>{'Save'}
                                <i className={'ico-checkmark-icon'} />
                            </button>
                        </div>
                     </div>
        </div>)
};

export default MyProfile;