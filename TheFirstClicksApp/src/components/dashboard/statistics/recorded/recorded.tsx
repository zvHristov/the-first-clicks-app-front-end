import React, {FC, memo, useCallback, useState, useRef, useLayoutEffect} from 'react';
import {HotspotsType} from '../../../../store/types';
import styles from './recorded.module.scss';
import {formatDatetime, getFlags, getHotToCoolColorGradient} from '../../../../shared/common-functions';
import TooltipStatisticsInfo from '../tooltip/tooltip';

interface Props {
  hotspots: HotspotsType[];
}
interface RecordedsSectionsProps {
    hotspots: HotspotsType[];

}
interface RecordedsTableProps {
    hotspot: HotspotsType;
    showRows: boolean;
    hotspots: HotspotsType[];

}

interface TooltipRecordsProps {
    hotspot: HotspotsType;
}

export const TooltipRecords: FC<TooltipRecordsProps> = memo(({
                                                        hotspot
                                                     }) => {
   /// console.log(hotspot, 'tooltip records')  
    const elementLink = `<a href='${hotspot.href}' class='${hotspot.className}'>${hotspot.context}</a>`;  
    const elementRedirected = `${hotspot.href}`;                                                  
    return (
    <div className={styles.tooltipRecords}>
        <p>{'Element:'}</p>
        <div>{elementLink}</div>
        <p>{'Redirected to:'}</p>
        <div>{elementRedirected}</div>
    </div>)
});

export const TableSections: FC<RecordedsTableProps> = memo(({
                                                        hotspot, showRows, hotspots
                                                     }) => {
    const tooltipRef = useRef<HTMLDivElement>();                                                 
    const [toggleInfoTagName, setToggleInfoTagName] = useState<boolean>(false);

    const handleClickInfo = () => {
        setToggleInfoTagName(!toggleInfoTagName);
    }

    useLayoutEffect(() => {
        const handleClickOutside = (e: any) => {
           
            if(tooltipRef.current && !tooltipRef.current.contains(e.target)) {
                setToggleInfoTagName(false);
            } 
         
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[tooltipRef]); 

    return (
        <div className={styles.rowRecordeds}>
                {showRows && <div>{`#${hotspot.id}`}</div>}
                <div className={styles.segmentColum}>
                    <button style={{backgroundColor: `${getHotToCoolColorGradient(hotspot.percentile, hotspots)}`}} className={`buttonsTFC ${styles.segmentType} `}>
                        
                        {hotspot.percentile >= 30 && <i className={`ico-fire-icon`} />}
                        {`${hotspot.percentile} %`}
                        
                    </button>
                </div>
                <div className={styles.tagNameColum}>
                    {hotspot.tagName}
                    <i 
                        onMouseEnter={() =>  handleClickInfo()}
                        onMouseLeave={() =>  handleClickInfo()} 
                        onClick={() => handleClickInfo()} 
                        className={`ico-info-ico`}/>
                    {
                        toggleInfoTagName && 
                        <TooltipStatisticsInfo
                            tooltipRef={tooltipRef} 
                            showTooltip={toggleInfoTagName}
                            contentClasses={styles.infoRec}
                            contentComponent={() => <TooltipRecords hotspot={hotspot} />}
                        />
                       
                    }
                </div>
                {
                    showRows ? 
                    <>
                             <div>{hotspot.timeToFirstClick}</div>
                             <div className={styles.timeRec}>
                                 <small>
                                     {formatDatetime(new Date(hotspot.time), 'd m')}
                                     </small>   
                                     <small>
                                     {formatDatetime(new Date(hotspot.time), 'h:m')}
                                     </small> 
                                 </div>
                             <div className={styles.flogHolder} >
                                 <abbr className={styles.flogInner}>
                                    <small className={styles.flogLocation}>{getFlags(hotspot.location)}</small>
                                 </abbr>
                                 </div>
                    </> : 
                     <>
                        <div>{'latest click'}</div>
                        <div>{hotspot.recordedClicks}</div>
                    </> 
                }

    </div>)
});

export const RecordedsSections: FC<RecordedsSectionsProps> = memo(({
                                                        hotspots
                                                     }) => {
    const [groupBy, setGroupBy] = useState<boolean>(true);

    const toggleGroupBy = useCallback(() => {
        setGroupBy(!groupBy);
    },[groupBy]);

    return (
        <div className={styles.tableRecordeds}>
            <div className={`${styles.headerRecorded} ${!groupBy &&  styles.headerRecordedByGroup}`}>
                {groupBy && <p>{'User ID'}</p>}
                <p>{'Segment'}</p>
                <p>{'Element type'}</p>
             
                {groupBy ? <>
                   <p>{'Time to first click'}</p>
                   <p>{'Time'}</p>
                   <p>{'Location'}</p>
                    </> :
                        <>
                            <p>{'Latest click'}</p>
                            <p>{'Recorded clicks'}</p>
                        </>
                    }
                <p className={styles.filtersRecorded}> 
                    <button onClick={toggleGroupBy} >
                        <i className={`${styles.switchRec} ${!groupBy &&  styles.switchRecByGroup}`} />    
                        {'Group by segment'}
                    </button>
                </p>
            </div>
         
            <div className={`${styles.tableRecorded} ${!groupBy &&  styles.tableRecordedByGroup}`}>
            { hotspots.map(hotspot => (
                <TableSections key={hotspot.id} hotspots={hotspots} hotspot={hotspot} showRows={groupBy} />
            ))}
            </div>
          

    </div>)
});


const Recorded = (props: Props) => {
    const {hotspots} = props;
    
    return (
        <div className={styles.recordedWrraper}>
            <RecordedsSections hotspots={hotspots} />
        </div>
    )
}
export default memo(Recorded);
