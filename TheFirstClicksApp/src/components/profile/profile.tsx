import React, {useState, useEffect, useCallback} from 'react';
import styles from './profile.module.scss';
import {listSettingPage} from './profile-state';
import MyProfile from './my-profile/my-profile';
import BillingInformation from './billing-information/billing-information';
import PaymentMethods from './payment-methods/payment-methods';
import Invoices from './invoices/invoices';
import Reporting from './reporting/reporting';

///TODO model user!
interface Props {

}

const NAVIGATE_PROFILEPAGE = {
    'MY_PROFILE' : <MyProfile />,
    'BILLING_INFORMATION' : <BillingInformation />,
    'PAYMENT_METHODS' : <PaymentMethods />,
    'INVOICES' : <Invoices />,
    'REPORTING' : <Reporting />,
}

const Profile = (props: Props) => {
    const [pages, setPages] = useState(null);

    const handlePageClick = useCallback((key: string) => {
        setPages(key);
    }, []);

    useEffect(() => {
        setPages('MY_PROFILE');
       
    },[]);
    return (<div className={styles.profileWrapper}>
        <div className={styles.profileSetting} >
           <div className={styles.profileSettingSection}>
                <h3 className={styles.setingHeading}>{'Setting'}</h3>
                    <ul className={styles.listItemPage}>
                        {listSettingPage && listSettingPage.map(item => (<li
                            className={`${styles.listSetting} ${item.key === pages && styles.activePage}`}
                            key={item.key} 
                            onClick={() => handlePageClick(item.key)} >{item.name}
                            <i className={item.icon}/></li>))}
                    </ul>
           </div>
        </div>
        <div className={styles.profileMain} >
        {pages && NAVIGATE_PROFILEPAGE[pages]}
        </div>
    </div>)
};

export default Profile;
