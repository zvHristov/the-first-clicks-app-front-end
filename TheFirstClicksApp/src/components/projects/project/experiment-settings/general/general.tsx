import React,{useCallback, useEffect, useState} from 'react';
import styles from './general.module.scss';
import {useDispatch} from 'react-redux';
import {InputsHtmlTypes, TextAreaHtmlTypes} from '../../../../inputs/Inputs';
import {SnippetArea} from '../../../../../shared/snippet-area/snippet-area';
import {useSelectorProject} from '../../job.hooks';
import {editProject} from '../../../projects.action-creators';

const General = () => {
    const dispatch = useDispatch();
    const job = useSelectorProject();
    const {name, description, domain} = job;
    ///console.log(job, 'job')
    const [info, setInfo] = useState<any>({
        name: name,
        description: description,

    });

    const updateInfoPage = () => {
        //TODO update project service / action creatore
      /// console.log('update info', info);
       dispatch(editProject(info));
    }


    const handleOnChange = useCallback((event: any) => {
        //TODO valid all props
        const {value, name} = event.target;
        //  console.log(value, name, 'value name');
        setInfo({...info, [name]: value});
          //TODO valid all props
        
    }, [info]);

    return (
    <div className={styles.generalWrraper}>
        {<div className={styles.generalInner}>
            <h1>{'General'}</h1>
            <div className={`formTFCborder ${styles.generalFormProject} `}>
                <TextAreaHtmlTypes
                        id={'name'}
                        value={info.name}
                        name={'name'}
                        onChange={handleOnChange}
                        helperText={'If empty, we will use the page title'}
                        label={'Job Title'}
                        textAreaClassName={'textareaTFC whiteBoards'}
                        
                        
                    />
                    <TextAreaHtmlTypes
                        id={'description'}
                        label={'Description'}
                        value={info.description}
                        name={'description'}
                        onChange={handleOnChange}
                        helperText={'Describe your monitor'}
                        textAreaClassName={'textareaTFC withAllBoards '}
                        
                    />
                    <InputsHtmlTypes 
                        type={'text'}
                        value={domain && '0'}
                        name={'domain'}
                        label={'URL'}
                        readonly={true}
                        classStyle={'primaryInputHolder'}
                    />
                    <div className={styles.saveHolder}>
                    <button onClick={updateInfoPage} className={`buttonsTFC mainBtn`}>{'Save'}
                        <i className={'ico-checkmark-icon'} />
                        </button>
             
                    </div>
            </div>
            <h3>{'Project snippet for Figma'}</h3>
            <p>{'Use your unique project snippet to all pages you want to track for the specific domain.'}</p>
            <div className={styles.snippetArea}> <SnippetArea  /></div>

        </div>}
    </div>
        )
};

export default General;