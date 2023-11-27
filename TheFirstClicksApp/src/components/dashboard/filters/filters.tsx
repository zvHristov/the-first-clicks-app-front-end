import React, {memo, useState} from 'react';
import styles from './filters.module.scss';
import Devices from '../devices/devices';
import {SelectHtmlTypes, InputsHtmlTypes} from '../../inputs/Inputs';
import Settings from '../settings/settings';
import {useStatisticsSwitch} from '../statistics/statistics.hooks';
interface PropsFilters {
    setSelectedTab: Function;
    selectedTab: string;

}

const Filters = (props: PropsFilters) => {
    const {setSelectedTab, selectedTab} = props;
    const [dateRange, setDateRange] = useState<any>({
        from: '',
        to: ''
    });
    const statisticsSwitch: boolean = useStatisticsSwitch();

    return(
        <div className={`${styles.filterWrapper}  ${!statisticsSwitch && styles.filtersDeviceContainerBarChars}`}>
            <p className={styles.filtersTitle}><small >{'Filters'}</small></p>
            <div className={`${styles.filtersDeviceContainer}  `}>
                {statisticsSwitch ?
                    <div className={styles.filtersDeviceHolder}>
                            <SelectHtmlTypes options={[
                                {
                                    value:'Today'
                                },
                                {
                                value:'Last week'
                            },{
                                value:'Last 60 days'
                            },{
                                value:'Since the begining'
                            },{
                                value:'Custom period'
                            }]}  />
                    </div> :
                    <>
                                 <InputsHtmlTypes
                                    type='date'
                                    name={'from'}
                                  
                                    classStyle={'primaryInputHolder calendar'}
                                />
                                <InputsHtmlTypes
                                        type='date'
                                        name={'name'}
                                        classStyle={'primaryInputHolder calendar'}
                                />
                    </>
                    
                }
                <div className={styles.filtersDeviceHolder}>
                    <SelectHtmlTypes options={[{
                        value:'All visitors'
                    },{
                        value:'First time visitors'
                    },{
                        value:'Returning visitors'
                    }]}  />
                </div>
                <div className={styles.filtersDeviceHolder}>
                    <SelectHtmlTypes options={[{
                        value:'All locations'
                    },{
                        value:'22'
                    },{
                        value:'33'
                    }]}  />
                </div>
            </div>
            
            <Devices selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <Settings />
        </div>
    )
};
export default memo(Filters);
