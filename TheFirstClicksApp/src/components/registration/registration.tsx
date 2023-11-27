import React, {useState, useCallback, useEffect} from 'react';
import styles from './registration.module.scss';
import {useDispatch} from 'react-redux';
import {InputsHtmlTypes} from '../inputs/Inputs';
import {registerUser} from '../login/login.action-creators';
import {useSelectorIsUserLoggedInfo} from '../user/user.hooks';
import {useHistory} from 'react-router';
import {ROUTES} from '../../shared/routes';
import {validEmail, validPassword} from '../../shared/common-functions';
interface Props {
    
}

const Registration = (props: Props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [valid, setValid] = useState<boolean>(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [isValidPass, setIsValidPass] = useState<boolean>(false);
    const [isValidAgree, setIsValidAgree] = useState<boolean>();
    const [userReg, setUserReg] = useState<any>({
        email: '',
        password: '',
        newsletter: '',
        agree: ''

    });
    const isUserLogged = useSelectorIsUserLoggedInfo();

    const handleReg = useCallback(() => {
        dispatch(registerUser({
            email: userReg.email,
            password: userReg.password
        }));
    }, [dispatch, userReg]);

    const handleOnChange = useCallback((event: any) => {

      const {value, name} = event.target;
      const validmail = validEmail(userReg.email);
      const validpass = validPassword(userReg.password);
     
      if(validmail?.input) {
        setIsValidEmail(true);
        setValid(true); 
      } else {
        setIsValidEmail(false);
        setValid(false); 
      } 
      if(validpass?.input) {
        setIsValidPass(true);
        setValid(true); 
      }  else {
        setIsValidPass(false);
        setValid(false); 
      }

      if(name === 'agree' && event.target.checked) {
        setIsValidAgree(true);
        setValid(true); 
      } 

      if (event.target.type === 'checkbox' && name === 'agree' && !event.target.checked) {
        setIsValidAgree(false);
        setValid(false); 
        setUserReg({...userReg, [name]: ''});
      } else {
        setUserReg({...userReg, [name]: value});
      }
  
    }, [userReg]);

    useEffect(() => {
        if(isUserLogged) {
            history.push(`${ROUTES.STATIC.WELCOME}`);
        }

        const onKeyUp = (event: any) => {
            if(valid && (event.key === 'Enter' || event.keyCode === 13)) {
                handleReg();
            }
        };
        window.addEventListener('keyup', onKeyUp, true);
        return () => window.removeEventListener('keyup', onKeyUp, true)
    },[isUserLogged, history, valid, handleReg]);

    return (<div className={styles.registrationWrapper}>
          <div className={styles.registrationInner}>
                <div className={styles.regHolder}>
                    <a href={`/`} title={'the first clicks'} >
                    <img src="/assets/img/thefirstclicks-main-logo.svg" 
                                className={styles.regLogin} alt="the first clicks" />
                    </a>
                </div>
                <div className={styles.regFormHolder}>
                    <h1>{'Create an Account for Free'}</h1>
                     <h4>{'Already have an account?'} <a href={`/login`}>{'Sign in'}</a></h4>
                     <div className={styles.googleLogin}>
                        <button className={`buttonsTFC borderBtn secoundaryWhiteBtn ${styles.googleBtn} `} >{'google'}</button>
                     </div>
                     <div className={`formTFCborder ${styles.formReg}`}>
                         <h2>{'Sign in using email and password'}</h2>
                        <InputsHtmlTypes
                            type={'email'}
                            name={'email'}
                            id={'email'}
                            label={'Email address'}
                            isRequired={true}
                            value={userReg.email}
                            onChange={handleOnChange}
                            classStyle={'grayInputHolder'}
                            hasError={!isValidEmail}
                            validateText={'We can’t find this email in our database'}
                        />
                        <InputsHtmlTypes
                            type={'password'}
                            name={'password'}
                            id={'password'}
                            label={'Password'}
                            isRequired={true}
                            value={userReg.password}
                            onChange={handleOnChange}
                            classStyle={'grayInputHolder'}
                            hasError={!isValidPass}
                            validateText={'Password must contain at least 1 number, 1 letter and 6 or more characters.'}
                        />
                        <p className={styles.msgErrorPassword}>{'At least 1 number, 1 letter and 6 or more characters.'}</p>
                        <div className={styles.credentialsHolder}>
                            <InputsHtmlTypes
                                type={'checkbox'}
                                id={'agree'}
                                name={'agree'}
                                label={'I read and agree to the Terms of service and Privacy policy'}
                                isRequired={true}
                                classStyle={'checkboxTFC'}
                                checked={isValidAgree}
                                value={userReg.agree}
                                onChange={handleOnChange}
                                hasError={!isValidAgree}
                                validateText={'You have to read and agree to our Terms of Service and Privacy Policy'}
                             />
                        </div>
                        <div className={styles.credentialsHolder}>
                            <InputsHtmlTypes
                                type={'checkbox'}
                                id={'newsletter'}
                                name={'newsletter'}
                                label={'Subscribe for our Monthly Newsletter'}
                                isRequired={true}
                                classStyle={'checkboxTFC'}
                                value={userReg.newsletter}
                                onChange={handleOnChange}
                             />
                        </div>
                        <button onClick={handleReg} className={`buttonsTFC mainBtn ${valid}-valid-error-class`}>{'Sign up'}
                            <i className={'ico-arrow-RIGHT-ico'} />
                        </button>
                    </div>
                 </div>
                 <footer>
                     <h5>{'By creating an account, you agree to our '}<a href={`/`}>{'Terms of service'}</a>{'and'}<a href={`/`}>{'Privacy policy'}</a></h5>
                     <h5>{'© 2021 - The First Clicks. All Rights Reserved.'}</h5>
                 </footer>
          </div>
        </div>);
  };

export default Registration;