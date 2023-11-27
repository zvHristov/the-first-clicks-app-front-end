import React, {memo, useCallback} from 'react';
import styles from './tooltip.module.scss';
interface Props {
   showTooltip: boolean;
   title?: string;
   description?: string;
   contentComponent?: React.ComponentType<any>;
   contentClasses?: any;
   tooltipRef?: any;
}

const TooltipStatisticsInfo = (props: Props) => {
    const {title, description, showTooltip, contentComponent, contentClasses, tooltipRef} = props;

    const TooltipContent = useCallback((props: any) => {
        const Content: React.ComponentType = contentComponent as React.ComponentType;
        return (<Content {...props} />);
    },[contentComponent]);

    return(<>
        {showTooltip && <div ref={tooltipRef} className={styles.tooltipWrraper}>
               <div className={`${styles.tootipInner} ${contentClasses}`}>
                    {title && <h4>{title}</h4>}
                    {description && <h5>{description}</h5>}
                    {contentComponent && <div>
                            <TooltipContent />
                        </div>}
               </div>
            </div>}            
    </>)
};
export default memo(TooltipStatisticsInfo);
