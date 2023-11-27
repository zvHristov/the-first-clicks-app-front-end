import React, {useState, useRef, useLayoutEffect} from 'react';
import styles from './header.module.scss';
import {ROUTES} from '../../shared/routes';
import {useHistory} from 'react-router';
import {
    logoutUser
} from '../login/login.action-creators';
import {useDispatch} from 'react-redux';

interface Props {

}

const HeaderTop = (props: Props) => {
    const [showNav, setShownav] = useState<boolean>(false);
    const ulRef = useRef<HTMLUListElement>();
    const clickedContainer = useRef<HTMLDivElement>();
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch(logoutUser());
        history.push(`${ROUTES.STATIC.LOGIN}`);
    }

    useLayoutEffect(() => {
        const handleClickOutside = (e: any) => {
            if(ulRef.current && !ulRef.current.contains(e.target) && !clickedContainer.current.contains(e.target)) {
                setShownav(false);
            }
        };
        
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[ulRef, clickedContainer]);

    return (
        <header className={styles.mainHeader}>
            <small className={styles.logoHolder}>
                <a href={`/`} title={`logo the first clicks`}>
                    <img src="/assets/img/thefirstclicks-main-logo.svg" className={styles.logo} alt="the first clicks" />
                </a>
            </small>
            <div className={styles.navigationHeader}>
                <a href={ROUTES.STATIC.CREATE_PROJECT} className={`buttonsTFC primaryBtn ${styles.btnGoToPtoject}`}>
                    {'Create a project'}
                    <i className={' ico-plus-ico'} />
                </a>
                <nav>
                    <div ref={clickedContainer} className={styles.navigationBar} onClick={(e) => setShownav(!showNav)} >{'T'}</div> 
                   
                {showNav && 
                    <ul ref={ulRef}>
                    <li><a href={ROUTES.STATIC.PROJECTS} >{'Projects'} 
                        <i className={'ico-jobs-ico'} />
                    </a></li>
                    <li><a href={ROUTES.STATIC.PROFILE} >{'My Account'}
                    <i className={'ico-account-ico'} />
                    </a></li>
                    <li><small onClick={logout} >{'Logout'}
                        <i className={'ico-upload-ico-1'} />
                    </small></li>
                    <button className={`buttonsTFC primaryBtn`}>
                        {'Upgrade'}
                    <i className={' ico-fire-icon'} />
                    </button>
                </ul>
                }
                </nav>
            </div>
        </header>
    )
};

export default HeaderTop;
