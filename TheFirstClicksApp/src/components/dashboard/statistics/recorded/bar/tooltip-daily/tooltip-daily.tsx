import React, {FC, memo} from 'react';
import styles from './tooltip-daily.module.scss';
import {formatDatetime} from '../../../../../../shared/common-functions';
import {ManageDailyBarEnum} from '../../../../../../shared/common-enum';

export interface TooltipDailyProps {
    data: any;
}

export const TooltipDaily: FC<TooltipDailyProps> = memo(({data}) => {
    const {firstClicks, avgTTFC, noClicks, date} = data;
    
    const newDate = new Date(date);
    const dailyDate = formatDatetime(newDate, 'MMMM  d,  yyyy');
    return (
        <div className={styles.dailyWrraper}>
            <abbr className={styles.dailydate} >{dailyDate}</abbr>
            <p><i className={styles.iconFirstClicks} /> {ManageDailyBarEnum['firstClicks']} <small>{firstClicks | 0}</small></p>
            <p><i  className={styles.iconAvgTTFC} /> {ManageDailyBarEnum['avgTTFC']} <small>{avgTTFC | 0}</small></p>
            <p><i  className={styles.iconNoClicks} /> {ManageDailyBarEnum['noClicks']} <small>{noClicks | 0}</small></p>

    </div>
    )
});