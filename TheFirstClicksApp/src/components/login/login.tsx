import React, {useState, useCallback, useEffect} from 'react';
import styles from './login.module.scss';
import {useDispatch} from 'react-redux';
import {InputsHtmlTypes} from '../inputs/Inputs';
import {loginUser} from './login.action-creators';
import {useSelectorIsUserLoggedInfo} from '../user/user.hooks';
import {useHistory} from 'react-router';
import {ROUTES} from '../../shared/routes';
import {validEmail, validPassword} from '../../shared/common-functions';
interface Props {
    
}

const Login = (props: Props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [valid, setValid] = useState<boolean>(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [isValidPass, setIsValidPass] = useState<boolean>(false);
    const [user, setUser] = useState<any>({
        email: '',
        password: '',
        credentials: false
    });
    const isUserLogged = useSelectorIsUserLoggedInfo();

    const handleLogin = useCallback(() => {
       dispatch(loginUser({
        email: user.email,
        password: user.password
       }));

    }, [user, dispatch]);

    const handleOnChange = useCallback((event: any) => {
        const {value, name} = event.target;
       
        const validmail = validEmail(user.email);
        const validpass = validPassword(user.password);
       // console.log(validmail)
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

        setUser({...user, [name]: value});
    }, [user]);

    useEffect(() => {
        if(isUserLogged) {
            history.push(`${ROUTES.STATIC.WELCOME}`);
        }

        const onKeyUp = (event: any) => {
            if(valid && (event.key === 'Enter' || event.keyCode === 13)) {
                handleLogin();
            }
        };
        window.addEventListener('keyup', onKeyUp, true);
    },[isUserLogged, history, valid, handleLogin]);

    return (<div className={styles.loginWrapper}>
            <div className={styles.loginInner}>
                 <div className={styles.logoHolder}>
                    <a href={`/`} title={'the first clicks'} >
                        <img src="/assets/img/thefirstclicks-main-logo.svg" 
                        className={styles.logoLogin} alt="the first clicks" />
                        </a>
                 </div>
                 <div className={styles.loginFormHolder}>
                     <h1>{'Login to your Account'}</h1>
                     <h4>{'Don’t have an account?'} <a href={`/register`}>{'Create one for free'}</a></h4>
                     <div className={styles.googleLogin}>
                        <button className={`buttonsTFC borderBtn secoundaryWhiteBtn ${styles.googleBtn} `} >{'google'}</button>
                     </div>
                     <div className={`formTFCborder ${styles.formLogin}`}>
                         <h2>{'Sign in using email and password'}</h2>
                        <InputsHtmlTypes
                            type={'email'}
                            name={'email'}
                            id={'email'}
                            label={'Email address'}
                            isRequired={true}
                            value={user.email}
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
                            value={user.password}
                            onChange={handleOnChange}
                            classStyle={'grayInputHolder'}
                            hasError={!isValidPass}
                            validateText={'Password must contain at least 1 number, 1 letter and 6 or more characters.'}
                        />
                        <div className={styles.credentialsHolder}>
                            <InputsHtmlTypes
                                type={'checkbox'}
                                id={'credentials'}
                                name={'credentials'}
                                label={'Remember my credentials on this device'}
                                isRequired={true}
                                classStyle={'checkboxTFC'}
                                value={user.credentials}
                                onChange={handleOnChange}
                             />
                        </div>
                        <button onClick={handleLogin} className={`buttonsTFC mainBtn ${valid}-valid-error-class`}>{'Sign in'}</button>
                     </div>
                 </div>
                 <footer>
                     <h5>{'© 2021 - The First Clicks. All Rights Reserved.'}</h5>
                 </footer>
            </div>
        </div>);
  };

export default Login;