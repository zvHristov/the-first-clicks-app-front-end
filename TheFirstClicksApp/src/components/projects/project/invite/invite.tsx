import React, {FC, memo} from 'react';
import styles from './invite.module.scss';
import {InputsHtmlTypes} from '../../../inputs/Inputs';
import TextAreaTags from '../../../../shared/textarea-tags/textarea-tags';

interface InviteProps {
    handleOnChange: (e) => void;
    valueFile: string;
    title: string;
    fileName?: string;
    uploadTags?: any;
}

export const Invite: FC<InviteProps> = memo(({handleOnChange, valueFile, title, fileName, uploadTags}) => {
    return (<div className={styles.filesInvitInnerEmails}>
        <div className={styles.filesInvetEmails}>
            <h4>{title}</h4>
            {fileName && <small>{fileName}</small>}  
            <div className={styles.uploadInvet}>
           
            <InputsHtmlTypes 
                type={'file'}
                name={'file'}
                id={'file'}
                label={'Upload CSV'}
                value={valueFile}
                onChange={(e) => handleOnChange(e)}
                    classStyle={`${styles.uploadButton} grayInputHolder`}
                />
                <i className={'ico-upload-ico'} />
            </div>
        </div>
        <div className={styles.managementInvitEmails}>
            <p className={styles.msgInvite}>{'Add email addresses to invite. Separate emails by comma (,) *'}</p>
            <TextAreaTags uploadTags={uploadTags} showButtonSent={true} showManagePermisions={true} />
        </div>
    </div>)
});
