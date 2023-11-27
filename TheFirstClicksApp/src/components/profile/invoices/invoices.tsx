import React from 'react';
import styles from './invoices.module.scss';

const Invoices = () => {
    return (<div className={styles.invoicesWrrapper}>
        <h1>{'Invoices'}</h1>
        <div className={'invoicesInner'}>
            {'Invoices '}
        </div>
        </div>)
};

export default Invoices;