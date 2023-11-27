import React, {useState, useCallback} from 'react';
import styles from './payment.module.scss';
import {InputsHtmlTypes} from '../../inputs/Inputs';

const PaymentMethods = () => {
    const [newCard, setNewCard] = useState<any>({
        cardNumber: '',
        expirationDateMonthYear: '',
        CVV: ''

    });
    const handleOnChange = useCallback((event: any) => {
        const {value, name} = event.target;
        
        //TODO valid !!---!! all strings )(*EDE(d09))       
        setNewCard({...newCard, [name]: value});
    }, [newCard]);

    const handleSaveCard = useCallback(() => {

    }, []);

    return (<div className={styles.paymentMethodsWrraper}>
        <h1>{'Payment - Methods'}</h1>
        <div className={styles.paymentMethodsContainer}>
            <div className={`formTFCborder ${styles.paymentCards} `}>
                <h2>{'Saved cards'}</h2>
            </div>
            <div className={`formTFCborder ${styles.paymentNewCards} `}>
                <h2>{'Add a new card'}</h2>
                <div className={styles.addNewCards}>
                        <InputsHtmlTypes 
                           type='text'
                           name={'cardNumber'}
                           value={newCard.cardNumber}
                           onChange={handleOnChange}
                           id='cardNumber'
                           label={'Card number'}
                           classStyle={'grayInputHolder'}
                        />
                        <div  className={styles.expirationCards}>
                           <div className={styles.expirationDate}>
                            <InputsHtmlTypes 
                                type='text'
                                name={'expirationDate'}
                                value={newCard.expirationDateMonthYear}
                                onChange={handleOnChange}
                                id='expirationDate'
                                label={'Expiration date'}
                                classStyle={`grayInputHolder`}
                                classIcon={'ico-info-ico'}
                                placeholder={'MM / YY'}
                                />
                        
                           </div>
                            <InputsHtmlTypes 
                                type='text'
                                name={'CVV '}
                                value={newCard.CVV }
                                onChange={handleOnChange}
                                id='CVV'
                                label={'CVV'}
                                classStyle={`grayInputHolder ${styles.expirationCVVInput}`}
                                classIcon={'ico-info-ico'}
                                />
                        </div>
                   
                        <div className={styles.btnHolder}>
                            <button onClick={handleSaveCard} className={`buttonsTFC mainBtn`}>
                                {'Save'}
                                <i className={'ico-checkmark-icon'} />
                            </button>
                        </div>
                </div>
            </div>
            <div className={styles.paymentSecureContainer}>
                <div className={styles.paymentSecure}>
                    <div>
                        <img src='assets/img/payment_securely.png' alt='secure' />
                    </div>
                    <p>{'Your credit card information are securely stored in a vault by Braintree, our third party Payment System gateway.'}</p>
                    <p>{'For easy access and retrieval, we only store the last 4 digits of your credit card and its expiration date.'}</p>
                </div>
            </div>
        </div>
        </div>)
};

export default PaymentMethods;