import React, {FC, memo, useRef, useState} from 'react';
import styles from './snippet-area.module.scss';
import {SNIPPETS} from '../common-consts';
import Snipped from './snippet';
interface SnippetAreaProps {
   
}
export const SnippetArea: FC<SnippetAreaProps> = memo(({}) => {
    const [copySuccess, setCopySuccess] = useState('');
    const textRef = useRef<HTMLDivElement>();

    const handleOnCopySnnipet = (event: any) => {
        ///console.log(event, 'event')
         if(textRef.current) {
           //console.log(textRef.current)
             //textAreaRef.current.onselect();
             event.target.focus();
         }

 
           try {
             navigator.clipboard.writeText(SNIPPETS) /// can move in state
       
             setCopySuccess('Copied!');
            //// document.execCommand('copy');
            ///  console.log('successful') 
           } catch (err) {
             console.log('Oops, unable to copy');
           }
     };

    return (<div ref={textRef} id='snippetText' className={styles.snippetAreaClassStyle}>
    {document.queryCommandSupported('copy') && <button onClick={(event) => handleOnCopySnnipet(event)}
     className={'buttonsTFC primaryBtn'}>
         {copySuccess ? copySuccess : 'Copy snippet'}
        <i className={'ico-copy-ico'} />
        </button>}
{SNIPPETS && <Snipped />}
</div>)
});

////<div><div dangerouslySetInnerHTML={{ __html: snippet }}  /></div>