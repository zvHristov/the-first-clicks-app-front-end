import React, {useEffect, useState} from 'react';
import styles from './dashboard.module.scss';
import {useSelectorInfo} from "./dashboad.hooks";
import {useDispatch} from 'react-redux';
import {getDashboardData} from './dashboard.action.creators';
import Header from "./header/header";
import NavigationStats from "../navigation-stats/navigation-stats";
import Desktop from "./devices/desktop/desktop";
import Tablet from "./devices/tablet/tablet";
import Phone from "./devices/phone/phone";

const NAVIGATE_DEVICE = {
    'Desktop' : <Desktop />,
    'Tablet' : <Tablet />,
    'Phone' : <Phone />
}
const Dashboard = () => {
    const dispatch = useDispatch();
    const [selectedTab,setSelectedTab] = useState<string>(null);

    const info = useSelectorInfo();

    useEffect(() => {
        setSelectedTab('Desktop');

        dispatch(getDashboardData());
    },[dispatch]);

    return (<div className={styles.dashboardWrapper}>
                 {info && <NavigationStats design={'Design'} project={'Project'} site={info.url} />}
                 {setSelectedTab && info &&
                 <Header info={info} selectedTab={selectedTab} setSelectedTab={setSelectedTab} 
             />}
                 <div className={styles.filtersSection}>
                     {info && selectedTab && NAVIGATE_DEVICE[selectedTab]}
                 </div>
             </div>);
};

export default Dashboard;
