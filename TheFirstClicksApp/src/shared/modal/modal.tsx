import React, {useCallback} from 'react';
import styles from './modal.module.scss';

interface Props {
    onClose: Function;
    titleComponent?: any;
    heplperText?: any;
    contentComponent?: React.ComponentType<any>;
    showCloseButton?: boolean;
}

const Modal = (props: Props) => {
    const {
        onClose, titleComponent, contentComponent, showCloseButton, heplperText
    } = props;
   
    const ModalContent = useCallback((props: any) => {
        const Content: React.ComponentType = contentComponent as React.ComponentType;
        return (<Content {...props} />);
    },[contentComponent]);
    
    const handleClose = () => {
        onClose();
    };

    return (
        <div className={styles.modalTFC}>
            <div className={styles.modalInner}>
                <div className={styles.modalHeader}>
                    {titleComponent && <h2>{titleComponent}</h2>}
                    {showCloseButton ?
                        (<span onClick={handleClose} className={styles.closeBtn}>
                            <i   className='ico-x-ico' />
                            {'Close'}
                        </span>) : false
                    }
                    {heplperText && <p>{heplperText}</p>}
             
                </div>

                {contentComponent &&
                <div className={`${styles.modalContent}`}>
                    <ModalContent/>
                </div>
                }
            </div>
        </div>
    )
};
export default Modal;
