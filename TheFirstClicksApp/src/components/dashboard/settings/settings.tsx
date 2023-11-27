import React, {memo, useCallback, useState, useLayoutEffect, useRef} from 'react';
import styles from './settings.module.scss';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {switchStats} from '../statistics/statistics.action.creators';
import {useStatisticsSwitch} from '../statistics/statistics.hooks';
import {ROUTES} from '../../../shared/routes';
interface Props {
  
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
const Settings = (props: Props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showSettingsPage, setShowSettingsPage] = useState<boolean>(false);
    const ulRef = useRef<HTMLUListElement>();
    const switchStatistics = useStatisticsSwitch();

    const handleOnSwitch = useCallback(() => {
      ////  console.log('handleOnSwitch')
        dispatch(switchStats(switchStatistics));
    },[dispatch, switchStatistics]);
    
    const handlingShowSettings = () => {
        setShowSettingsPage(!showSettingsPage);
    };

    const handleOnClickSettings = (item: string) => {
     ////   console.log(item, 'click settings')
        
        if(item === 'settings') {
            /// TODO routing
            history.push(`${ROUTES.STATIC.EXPERIMENT_SETTINGS}/1`);
        }
     
    }

    useLayoutEffect(() => {
        const handleClickOutside = (e: any) => {
           
            if(ulRef.current && !ulRef.current.contains(e.target)) {
                setShowSettingsPage(false);
            }
          
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[ulRef]);

    return (
        <div className={styles.settingsPage}>
            <div className='btn_settings'>
              <i onClick={handlingShowSettings}  className={'ico-settings-outline-ico'} />
                {
                    showSettingsPage &&
                        <ul ref={ulRef}>
                            {textOptions && textOptions.map((el: ISettingsOption) => (
                                <li key={el.value} onClick={() => handleOnClickSettings(el.value)} >
                                    <span>{el.name}</span>
                                    <i className={settingsIcons[el.value]} />
                                </li>
                            ))}
                        </ul>
                }
            </div>

            <button className='buttonsTFC mainBtn' onClick={() => handleOnSwitch()} >{'View Statistics'}
                <i className={`ico-stats-ico`} />
            </button>
        </div>
    )
}
export default memo(Settings);
