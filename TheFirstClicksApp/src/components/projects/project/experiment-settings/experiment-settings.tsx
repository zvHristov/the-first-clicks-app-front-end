import React, {useEffect, useState, useCallback} from 'react';
import styles from './experiment-settings.module.scss';
import {listExperimentSettingsPage} from '../project-state';
import General from './general/general';
import ExcludeElements from './exclude-elements/exclude-elements';
import Team from './team/team';
import {useLocation} from 'react-router';
import {useDispatch} from 'react-redux';
import {getProjectById} from '../job.action-creators';
import {getLastPatnToNumber} from '../../../../shared/common-functions';

///TODO model user!
interface Props {

}

const NAVIGATE_EXPERIMENTPAGE = {
    'GENERAL' : <General />,
    'EXCUDE_ELEMENTS' : <ExcludeElements />,
    'TEAM' : <Team />,
}

const ExperimentSettings = (props: Props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const lastPath = getLastPatnToNumber(location.pathname);
    const [pages, setPages] = useState(null);

    const handlePageClick = useCallback((key: string) => {
        setPages(key);
    }, []);

    useEffect(() => {
        setPages('GENERAL');
        dispatch(getProjectById(lastPath))
    },[dispatch, lastPath]);
    
    return (<div className={styles.experimentSettingsWrapper}>
        <div className={styles.experimentSettings} >
           <div className={styles.experimentSettingSection}>
                <h3 className={styles.setingHeading}>{'Setting'}</h3>
                    <ul className={styles.listItemPage}>
                        {listExperimentSettingsPage && listExperimentSettingsPage.map((item,i) => (<li
                            className={`${styles.listSetting} ${item.key === pages && styles.activePage}`}
                            key={i} 
                            onClick={() => handlePageClick(item.key)} >{item.name}
                            <i className={item.icon}/></li>))}
                    </ul>
           </div>
        </div>
        <div className={styles.experimentMain} >
        {pages && NAVIGATE_EXPERIMENTPAGE[pages]}
        </div>
    </div>)
};

export default ExperimentSettings;
