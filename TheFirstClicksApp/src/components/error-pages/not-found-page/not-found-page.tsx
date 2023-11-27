import React, {FC, useEffect} from 'react';
import {useHistory} from 'react-router';
import {useDispatch} from 'react-redux';
import styles from './not-found-page.module.scss';
import {showPageNotFound} from '../../../store/init.action.creators';

const NotFoundPage: FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(showPageNotFound(true));
    return () => {
        history.listen(() => {
            dispatch(showPageNotFound(false));
           });
    }
    }, [dispatch, history]);

    return (
        <div id="page-status-404" className={styles.pageNotFoundWrapper}>
            <div className={styles.description}>
                <div className={styles.descriptionInner}>
                   <h1>{'Page not found'}</h1>
                   <div className={styles.loadigSpiner}>
                        <img src="/assets/img/loader.svg" alt="not found 404" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NotFoundPage;
