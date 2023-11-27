import React, {useState, useCallback} from 'react';
import styles from './reporting.module.scss';
import {InputsHtmlTypes} from '../../inputs/Inputs';

const Reporting = () => {
    const [mailSettings, setMailSettings] = useState<any>({
        dailyDigest: '',
        weeklyDigest: '',
        monthlyDigest: '',
        receiveNewsletter: '',
        earlyFeatures: ''

    });

    const handleOnChange = useCallback((event: any) => {
        const {value, name} = event.target;     
        setMailSettings({...mailSettings, [name]: value});
    }, [mailSettings]);


    return (<div className={styles.reportingWrraper}>
            <h1>{'Reporting'}</h1>
            <div className={styles.reportingInner}>
                <div className={`formTFCborder ${styles.reportingForm} `}>
                    <div className={styles.sectionsForm}>
                        <InputsHtmlTypes 
                                type='checkbox'
                                name={'dailyDigest'}
                                value={mailSettings.dailyDigest}
                                onChange={handleOnChange}
                                id='dailyDigest'
                                label={'Daily digest'}
                                classStyle={'checkboxTFC'}
                            />
                            <InputsHtmlTypes 
                                type='checkbox'
                                name={'weeklyDigest'}
                                value={mailSettings.weeklyDigest}
                                onChange={handleOnChange}
                                id='weeklyDigest'
                                label={'Weekly digest'}
                                classStyle={'checkboxTFC'}
                            />
                            <InputsHtmlTypes 
                                type='checkbox'
                                name={'monthlyDigest'}
                                value={mailSettings.monthlyDigest}
                                onChange={handleOnChange}
                                id='monthlyDigest'
                                label={'Monthly digest'}
                                classStyle={'checkboxTFC'}
                            />
                    </div>
                    <div className={`lineTFC ${styles.sectionsLine}`} />
                    <div className={styles.sectionsForm}>
                    <InputsHtmlTypes 
                            type='checkbox'
                            name={'receiveNewsletter'}
                            value={mailSettings.receiveNewsletter}
                            onChange={handleOnChange}
                            id='receiveNewsletter'
                            label={'Receive our newsletter'}
                            classStyle={'checkboxTFC'}
                        />
                        <InputsHtmlTypes 
                            type='checkbox'
                            name={'earlyFeatures'}
                            value={mailSettings.earlyFeatures}
                            onChange={handleOnChange}
                            id='earlyFeatures'
                            label={'Get early access to new features'}
                            classStyle={'checkboxTFC'}
                        />
                    </div>
                </div>
            </div>
        </div>)
};

export default Reporting;
