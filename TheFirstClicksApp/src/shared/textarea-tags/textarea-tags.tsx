import React, {useRef,FC, useState, memo, useMemo, useCallback, useEffect} from 'react';
import "@yaireo/tagify/dist/tagify.css";
import Tags from "@yaireo/tagify/dist/react.tagify";
import styles from './textarea-tags.module.scss';
import {SelectSettings} from '../../components/inputs/Inputs';
import {ManageTeamEnum} from '../common-enum';


const EMAIL_REX = /^[^\s@]+@[^\s@]+$/;
interface ManagePermisionsProps {
    title?: string;
    newUsers?: any[];
    handleOnClick: Function;
    handleOnRemove: (e: any, index: number) => void;
    showButton?: boolean;
    showManagePermisions?: boolean;
}
//labelTFC
export const ManagePermisions: FC<ManagePermisionsProps> = memo(({
    handleOnRemove, 
    handleOnClick, title, showButton, newUsers, showManagePermisions}) => {

    return (
        <div className={styles.innerUser}>
           {(newUsers.length !== 0 || showManagePermisions) && <h2>{title}</h2>}

            {newUsers &&
            <div className={styles.userContainer}>
               
                {newUsers.map((u,i) => (<div className={styles.userRow} key={i} >
                        <p> <span>{u.value.charAt(0)}</span></p>
                        <p className={styles.emailUser}>{u.value}</p>
                        <p> <SelectSettings
                        
                                key={u.value}
                            options={[
                                        {value: ManageTeamEnum['EDITOR']},
                                        {value: ManageTeamEnum['VIEWER']},
                                        {value: ManageTeamEnum['MANAGE']}
                                    ]}
                        classStyle={'filters'}/>
                        </p>
                        <i onClick={(e) => handleOnRemove(e,i)} className={'ico-x-ico'} />
                    </div>))   
                }
                <div className={styles.userFooter}>
                    {newUsers.length !== 0 && <p>{`${newUsers.length} people will be invited`}</p>}
                    {showButton && <div>
                    
                        <button onClick={() => handleOnClick()} className={'buttonsTFC mainBtn'}>
                            {'Send invites'}
                        <i className={'ico-arrow-RIGHT-ico'} />
                    </button></div>}
                </div>
            </div>
            }
        </div>
    )
});
interface TextAreaTagsProps {
    showButtonSent?: boolean;
    placeholder?: string;
    showManagePermisions?: boolean;
    uploadTags?: any;
}

const TextAreaTags = (props: TextAreaTagsProps) => {
    const {showButtonSent, placeholder, showManagePermisions, uploadTags} = props;
    const tagsRef = useRef(null);
    const [tags, setTags] = useState([]);

    const handleOnCklickSendInvites = useCallback(() => {
      /// console.log('send ', tags,'tags will sended')
        
    },[tags]);

    const handleCallbackOnRemovetag = useCallback((event: any, index?: number) => {
        
      ///  console.log(event, index, 'event')
        if(index !== undefined) {
            let updateTag = [...tags];
            updateTag.splice(index, 1);
          tagsRef.current && tagsRef.current.removeTag(tagsRef.current.value[index].value, 4.2, 14.2);
          setTags(updateTag);
        } else {
            // let tagsItem = [...tags];
            // updateTag.splice(event.detail.index, 1);
          ////  console.log( event.detail.index, event.detail.data, 'updateTag, event index, data')
        }
       
       
     },[tags]);

    const handleOnAdd = useCallback((event: any) => {
        if(event.detail.data) {
            setTags(tags => [...tags, event.detail.data]);
        }
    },[]);

    const handleOnEdit = useCallback((event: any) => {
       /// console.log('edit:::', event)
        const editTag = [...tags];
        if(event.detail) {
          //  console.log(event.detail.index,'edit tag event.detail.index')
            //setTags(event.detail.data);
             ///editTag[event.detail.index] = event.detail.data.newValue;
            // setTags(editTag);
           // setTags(editTag);
           ///data:
            // newValue: "ivan-peshev@btn.nh"
            // value: "dddds-ss@wwlk.ee"
            // __isValid: true
            // __proto__: Object
            // index: 0
        }
        // setTags(editTag);
        ///console.log(editTag, 'tags')
    },[tags]);

    const variables = useCallback(() => {
        console.log(uploadTags, 'useCallback uploadTags');
        return uploadTags;
    },[uploadTags]);



    const settings = {
        editTags: false,
        removeTags: false,
        pattern: EMAIL_REX,
        whitelist: variables,
        loading: true,
        
        callbacks: {
         remove: (e) => handleCallbackOnRemovetag(e),
         add: (e) => handleOnAdd(e),
         edit: (e) => handleOnEdit(e),
       
        }
    };

    useEffect(() => {
       if(uploadTags) {
        console.log(uploadTags, 'uploadTags');
        
       }
 
    }, [uploadTags]);
    console.log(uploadTags, tags ,'load, tags')
    return (<>  
            <div className={styles.textareaTagsWrraper}>
                    <Tags
                        tagifyRef={tagsRef}
                        className={styles.textareaStyle}
                        showFilteredDropdown={false}
                        toggleClass={false}
                        settings={settings}
                        placeholder={placeholder}
                      
                       
                    />
                   <ManagePermisions 
                    newUsers={tags}
                    handleOnRemove={handleCallbackOnRemovetag} 
                    title={'Manage permisions'} 
                    handleOnClick={handleOnCklickSendInvites}
                    showButton={showButtonSent}
                    showManagePermisions={showManagePermisions}
            
                    />
            </div>
           
        </>)
}

export default TextAreaTags;