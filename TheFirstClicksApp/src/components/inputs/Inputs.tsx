import React, {FC, memo} from "react";
import styles from './input.module.scss';

interface TextAreaProps {
    value?: string;
    id?: string;
    refTextArea?: any;
    classStyle?: string;
    textAreaClassName?: string;
    text?: string;
    label?: string;
    name?: string;
    isRequired?: boolean;
    isAutocomplete?: string;
    iconClass?: string;
    onChange?: (e) => void;
    onClick?: (e) => void;
    disabled?: boolean;
    onClickIcon?: () => void;
    placeholder?: string;
    labelClassName?:string;
    hasError?: boolean;
    validateText?: string;
    helperText?: string;
    helperTextClassName?: string
}
//labelTFC
export const TextAreaHtmlTypes: FC<TextAreaProps> = memo(({

                                                         id, value,
                                                         classStyle,
                                                         text, name,
                                                         label,labelClassName, hasError, validateText,refTextArea,
                                                         disabled, onClickIcon,placeholder,textAreaClassName,helperText,
                                                         helperTextClassName,
                                                         isRequired,isAutocomplete, iconClass, onChange , onClick
                                                     }) => {
    return (<div className={styles.firstClicksInput}><p className={classStyle}>{text}
        {label && <label className={labelClassName} htmlFor={id}>{label}</label>}
        {helperText && <small className={helperTextClassName} >{helperText}</small>}
          <textarea
                id={id}
                ref={refTextArea}
                name={name}
                className={textAreaClassName}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onClick={onClick}
                autoComplete={isAutocomplete}
                required={isRequired}
                disabled={disabled}>{}</textarea>
        {iconClass && <i onClick={onClickIcon} className={iconClass} />}
        {hasError && <b className={'validate-error'}>{hasError && validateText}</b>}
        </p></div>)
});

interface InputProps {
    type: string;
    value?: string;
    refInput?:any;
    placeholder?: string;
    id?: string;
    classStyle?: string;
    text?: string;
    label?: string;
    name?: string;
    isRequired?: boolean;
    isAutocomplete?: string;
    iconClass?: string;
    onChange?: (e) => void;
    disabled?: boolean;
    onClickIcon?: () => void;
    hasError?: boolean;
    validateText?: string;
    readonly?: boolean;
    classIcon?: string;
    dataIndex?: number;
    datalistSearch?: string[];
    listId?: string;
    checked?: boolean;
}

export const InputsHtmlTypes: FC<InputProps> = memo(({
                                                  type,datalistSearch,listId,
                                                  id, value, dataIndex,
                                                  classStyle,
                                                  text,
                                                  label,classIcon,checked,
                                                  name,disabled, onClickIcon,placeholder,hasError, validateText,
                                                  isRequired,isAutocomplete, iconClass, onChange, refInput, readonly
                                              }) => {
    return (<div className={styles.firstClicksInput}><p className={classStyle}>{text}
        {label && <label htmlFor={id}>{label}
           {classIcon && <i className={classIcon} />}
            </label>}
        <input onChange={onChange}
               value={value}
               name={name}
               type={type}
               ref={refInput}
               id={id}
               data-index={dataIndex}
               autoComplete={isAutocomplete}
               placeholder={placeholder}
               list={listId}
               disabled={disabled}
               readOnly={readonly}
               required={isRequired}
               checked={checked}
        />
        {datalistSearch && listId && <datalist id={listId} >{datalistSearch.map(opt => (<option key={Math.random().toString(36)} value={opt} />))}</datalist>}       
        {iconClass && <i onClick={onClickIcon} className={iconClass} />}</p>
        {hasError && <b className={'validate-error'}>{hasError && validateText && validateText}</b>}
    </div>)
});
interface IOption {
    value: string;
    text?: string;
}
interface SelectProps {
    id?: string;
    refSelect?: any;
    classStyle?: string;
    text?: string;
    label?: string;
    name?: string;
    isRequired?: boolean;
    isAutocomplete?: string;
    options: IOption[];
    valueOption?: string;
}

export const SelectHtmlTypes: FC<SelectProps> = memo(({
                                                   id,
                                                   classStyle,
                                                   text,
                                                   label,
                                                   name,
                                                   isRequired,
                                                   options,
                                                   valueOption,
                                                          refSelect

                                               }) => {
    return (<>{text && text}<select className={classStyle} ref={refSelect}>{
        options && options.map(opt => (<option key={Math.random().toString(36)} value={opt.value} >{opt.value && opt.value}</option>))
    }</select></>)
});
interface SelectSettingsProps {
    id?: string;
    classStyle?: string;
    text?: string;
    label?: string;
    name?: string;
    isRequired?: boolean;
    isAutocomplete?: string;
    options: IOption[];
    valueOption?: string;
}
export const SelectSettings: FC<SelectSettingsProps> = memo(({
                                                          id,
                                                          classStyle,
                                                          text,
                                                          label,
                                                          name,
                                                          isRequired,
                                                          options,
                                                          valueOption,

                                                      }) => {
    return (<><SelectHtmlTypes
            id={id}
            classStyle={classStyle}
            text={text}
            label={label}
            name={name}
            isRequired={isRequired}
            options={options}
            valueOption={valueOption}
        /></>)
});
