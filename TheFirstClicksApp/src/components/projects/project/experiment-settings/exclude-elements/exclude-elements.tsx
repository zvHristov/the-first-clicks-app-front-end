import React, {FC, useState, useCallback, memo, useMemo, useEffect} from 'react';
import styles from './exclude-elements.module.scss';
import {useDispatch} from 'react-redux';
import {InputsHtmlTypes} from '../../../../inputs/Inputs';
import {useSelectorExcludeElementsProject} from '../../job.hooks';
import {debounce} from '../../../../../shared/common-functions';
import {editProject} from '../../../projects.action-creators';

interface ExcluceInputProps {
    handleOnChange: (event: any) => void;
    valueInput: string;
    nameInput: string;
    dataIndex: number;
}
 const ExcluceInput: FC<ExcluceInputProps> = memo(({handleOnChange, valueInput, nameInput, dataIndex}) => {
    return (<div className={styles.controlHolder}>
        <span>{'id='}</span>
            <InputsHtmlTypes
                type={'text'}
                name={nameInput}
                value={valueInput}
                dataIndex={dataIndex}
                onChange={(event) => handleOnChange(event)}

            />
</div>)
});

const ExcludeElements = () => {
    const dispatch = useDispatch();
    const excludeElements = useSelectorExcludeElementsProject() || [];
  /// console.log(excludeElements, 'excludeElements')
    const hasElements: any[] = excludeElements.flatMap(e => {
        return {
            value: e, 
            name: e
        }
    }) || [];
    console.log(hasElements, 'hasElements')
    const blankInput = useMemo(() => { return {name: '', value: ''}}, []);

    const [inputState, setInputState] = useState<any[]>([  
      {...blankInput},
      {...blankInput},
      {...blankInput},
    ]);
    
    const handleOnChange = debounce((event: any) => {
        const updatedInputs = [...inputState];
        const {dataset, value} = event.target;
        updatedInputs[dataset.index] = value;
       setInputState(updatedInputs);
       event.preventDefault();
    }, 100);

    const handleOnAddedInput = useCallback(() => {
        setInputState([...inputState, {...blankInput}]);
    }, [inputState, blankInput]);

    const saveExcludeElements = () => {
        ///TODO... if must validated inputs 
        ///console.log('save elements', inputState)
       const arrElem = [...inputState];
      
        const addExcElements = {
            excludedElements: arrElem
        };
        ///console.log('save addExcElements', addExcElements)
       dispatch(editProject(addExcElements))
    };

    useEffect(() => {

    }, []);

    return (
    <div className={styles.excludeElementsWrraper}>
        <div className={styles.excludeElementsContainer}>
            <h1 className={styles.excludeElementsHeadr}>{'Exclude Elements'}</h1>
            <div className={`formTFCborder ${styles.excludeElementsForm}`}>
               <h2>{'Exclude elements that you don’t want to measure the first click on.'}</h2>
               <h3>{'We encourage you to exclude:'}</h3>
               <ul>
                   <li>{'Cookies policy'}</li>
                   <li>{'Menu togglers'}</li>
                   <li>{'Other elements that are not critical to visitor success'}</li>
               </ul>
               <div className={styles.formHolder}>
                        <h5>{'Element ID*'}</h5>
                
                        {/* {inputsAdded.map( (el,i) => (
                            <ExcluceInput
                            dataIndex={i}
                            key={i}
                            handleOnChange={handleOnChange}
                            valueInput={el}
                            nameInput={`name_${el}`}
                          /> 
                        ))} */}

                        {
                         inputState.map((input, index) => {
                            

                            return(
                                <ExcluceInput
                                dataIndex={index}
                                key={index}
                                handleOnChange={handleOnChange}
                                valueInput={input.value}
                                nameInput={input.name}
                         /> 
                         )})   
                        }
        
                    </div>
                    <div className={styles.btnHolder}>
                        <button onClick={handleOnAddedInput} className={`buttonsTFC secoundaryGrayBtn`}>{'Add field'}
                            <i className={'ico-plus-ico'} />
                            </button>
                        <button onClick={() => saveExcludeElements()} className={`buttonsTFC mainBtn`}>{'Save'}
                        <i className={'ico-checkmark-icon'} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.navigation}>
                    <h5>{'A few quick notes'}</h5>
                    <p>{' ➔ The best thing here is that you can add as many unique IDs to your web page (one per element, of course).'}</p>
                    <p>{'➔ Usually most important elements have their own id, which is unique and not-repeatable. (it’s not too common to add IDs to everything, but it’s doable.) '}</p>
                    <p>{'➔ You can find it in the code and/or ask the Dev team to add IDs to elements you want to manage using The First Clicks.'}</p>
                    <div><img src="/assets/img/screenshot_code.png" alt='code' /></div>
                    <p>{'Having troubles? Contact us and we will help you customize your jobs!'}</p>
                
            </div>
        
        </div>)
};

export default ExcludeElements;