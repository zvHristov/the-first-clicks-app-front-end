import React, {FC, memo} from 'react';
import styles from './settings-list.module.scss';

interface Props {
    listRef?: any;
    handleOnClick?: (item?: any, index?: number) => void;
    index?: number;
}
interface ISettingsOption {
    value: string;
    name: string;
}
const textOptions = [
    {
        value: 'webpage',
        name: 'Retake webpage'
    },
    {
        value: 'settings',
        name: 'Settings'
    },
    {
        value: 'pause',
        name: 'Pause this page'
    },
    {
        value: 'delete',
        name: 'Delete job'
    }
];
const settingsIcons = {
    'webpage' : 'ico-webpage-ico',
    'settings' : 'ico-edit-ico',
    'pause' : 'ico-pause-page-click',
    'delete' : 'ico-x-ico',
}
const SettingsProjectList: FC<Props> =  ({listRef, handleOnClick, index}) => {

    return (<ul ref={listRef} className={styles.settingsPage}>
                            {textOptions && textOptions.map((el: ISettingsOption) => (
                                <li key={el.value} onClick={() =>  handleOnClick(el, index)} >
                                    <span>{el.name}</span>
                                    <i className={settingsIcons[el.value]} />
                                </li>
                            ))}
                        </ul>)
}
export default memo(SettingsProjectList);
