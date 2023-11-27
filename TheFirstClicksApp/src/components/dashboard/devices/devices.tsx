import React, {FC, memo} from 'react';
import styles from './devices.module.scss';

interface Props {
    setSelectedTab: Function;
    selectedTab: string;
}

const percentage = {
    'DESKTOP': '57.7 (59.7%)',
    'TABLET' : '1 (1.07%)',
    'PHONE' : '39 (40.3%)'
}
const iconsDevices = {
    'DESKTOP' : 'ico-desktop-ico',
    'TABLET' : ' ico-tablet-ico',
    'PHONE' : 'ico-mobile-ico',
};
const mapTab = ['Desktop' ,'Tablet' ,'Phone'];
interface ButtonDeviceTypesProps {
    setSelectedTab: Function;
    selectedTab: string;
    mapTab: any[string];
    iconsDevices: any;
};


export const  ButtonDevice: FC<ButtonDeviceTypesProps> = memo(({
                                                                   setSelectedTab, selectedTab, mapTab, iconsDevices
                                                               }) => {
    ///console.log(selectedTab, 'selectedTab')
    return (mapTab && mapTab.map(btn => (
        <button key={btn} className={`${btn === selectedTab &&
        styles.active} ${styles.deviceCtrlHolder}`}
                onClick={() => setSelectedTab(btn)}>
            <i className={iconsDevices[btn.toUpperCase()]} />
            <span>{btn && percentage[btn.toUpperCase()]}</span>
        </button>
    )))
});
const Devices = (props: Props) => {
    const {setSelectedTab, selectedTab} = props;

    return(setSelectedTab &&
        <div className={styles.devicesContrWrapper}>
            <small className={styles.devicesContrTitle}>{'Device type'}</small>
           <div className={styles.devicesControllesHolder}>
               <ButtonDevice setSelectedTab={setSelectedTab} selectedTab={selectedTab} mapTab={mapTab} iconsDevices={iconsDevices} />
           </div>
        </div>
    )

}
export default memo(Devices);
