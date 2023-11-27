import React, {useState, useCallback} from 'react';
import styles from './billing.module.scss';
import {InputsHtmlTypes, SelectHtmlTypes} from '../../inputs/Inputs';

const BillingInformation = () => {
    const [billingInformation, setBillingInformation] = useState<any>({
        companyName: '',
        VAT: '',
        address: '',
        ZIPCode: '',
        city:'',
        country: [
            {
                value: 'Brasil',
                text: ''
            },
            {
                value: 'Japan',
                text: ''
            },
            {
                value: 'Chile',
                text: ''
            }
        ],
        phoneNumber: ''
    });
    const handleOnChange = useCallback((event: any) => {
        const {value, name} = event.target;
        
        //TODO valid !!---!! all strings )(*EDE(d09))       
        setBillingInformation({...billingInformation, [name]: value});
    }, [billingInformation]);

    const handleSaveBillingInformation = useCallback(() => {

    }, []);

    return (<div className={styles.billingWrraper}>
        <h1>{'Billing Information'}</h1>
        <div className={`formTFCborder ${styles.billingInner}`}>
            <div className={styles.billingFormHolder}>
                <InputsHtmlTypes
                    type='text'
                    name={'companyName'}
                    value={billingInformation.companyName}
                    onChange={handleOnChange}
                    id='companyName'
                    label={'Company name'}
                    classStyle={'grayInputHolder'}
                />
                <InputsHtmlTypes
                    type='text'
                    name={'VAT'}
                    value={billingInformation.VAT}
                    onChange={handleOnChange}
                    id='VAT'
                    label={'VAT'}
                    classStyle={'grayInputHolder'}
                
                />
                <InputsHtmlTypes
                    type='text'
                    name={'address'}
                    value={billingInformation.address}
                    onChange={handleOnChange}
                    classStyle={'grayInputHolder'}
                    id='address'
                    label={'Address'}
                />
                <InputsHtmlTypes
                    type='text'
                    name={'ZIPCode'}
                    value={billingInformation.ZIPCode}
                    onChange={handleOnChange}
                    id='ZIPCode'
                    label={'ZIP Code'}
                    classStyle={'grayInputHolder'}
                
                />
                  <InputsHtmlTypes
                    type='text'
                    name={'city'}
                    value={billingInformation.city}
                    onChange={handleOnChange}
                    id='city'
                    label={'City'}
                    classStyle={'grayInputHolder'}
                />
                <div className={styles.country}>
                    <small>{'Country'}</small>
                    <SelectHtmlTypes
                        options={billingInformation.country}
                        classStyle={'filters medium'}
                    />
                </div>
                <InputsHtmlTypes
                    type='text'
                    name={'phoneNumber'}
                    value={billingInformation.phoneNumber}
                    onChange={handleOnChange}
                    id='phoneNumber'
                    label={'Phone number'}
                    classStyle={'grayInputHolder'}
                />
              <div className={styles.btnHolder}>
                <button onClick={handleSaveBillingInformation} className={`buttonsTFC mainBtn`}>{'Save'}
                            <i className={'ico-checkmark-icon'} />
                        </button>
              </div>
            </div>
        </div>
        </div>)
};

export default BillingInformation;