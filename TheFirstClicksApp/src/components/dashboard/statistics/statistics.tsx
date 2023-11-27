import React, {FC, memo, useCallback, useState, useLayoutEffect, useRef, useEffect} from 'react';
import styles from "./statistics.module.scss";
import {StatisticsType, StatsTypes, HotspotsType} from "../../../store/types";
import {toggleStats} from "./statistics.action.creators";
import {useDispatch} from 'react-redux';
import {useStatisticsToggle, useStatisticsSwitch} from "./statistics.hooks";
import Recorded from './recorded/recorded';
import Bar from './recorded/bar/bar';
import TooltipStatisticsInfo from './tooltip/tooltip';
import {detectMobile, getHotToCoolColorGradient} from '../../../shared/common-functions';

interface Props {
    statsTypes: StatsTypes;
}
interface StatsTypesProps {
    statistics: StatisticsType;
    hotspotsLength: number;
}


interface StatsElementProps {
    clickedRef: any; 
    tooltipRef: any; 
    showTooltip: boolean; 
    items: string[];
    showTootip: (el: string) => void;
    sectionClasses?: any;
}

interface HeaderBarStatsTypesProps {
    statistics: StatisticsType;
    hotspotsLength: number;
}

export const HeaderBarStatsSections: FC<HeaderBarStatsTypesProps> = memo(({
                                                        statistics, hotspotsLength
                                                     }) => {
    
    const tooltipRef = useRef<HTMLDivElement>();    
    const clickedFirstClicksRef = useRef<HTMLElement>();
    const clickedNoClicksRef = useRef<HTMLElement>();
    const clickedAvgTTFCRef = useRef<HTMLElement>();
    const clickedHotspotsRef = useRef<HTMLElement>();
    const [showTooltip, setShowTooltip] = useState<any>({
        firstClicks: false,
        noClicks: false,
        avgTTFC: false,
        hotspots: false,
    });  

    const showTootip = useCallback((props: any) => {
        const newItem = {...showTooltip};
        const showItem = !newItem[props];
        setShowTooltip({
            ...showTooltip,
            [props]: showItem
            
        });
    }, [showTooltip]);
    useLayoutEffect(() => {
        const handleClickOutside = (e: any) => {
           
            if(tooltipRef.current && !tooltipRef.current.contains(e.target) && 
            clickedFirstClicksRef.current && !clickedFirstClicksRef.current.contains(e.target) &&
            clickedNoClicksRef.current && !clickedNoClicksRef.current.contains(e.target) &&
            clickedAvgTTFCRef.current && !clickedAvgTTFCRef.current.contains(e.target) && 
            clickedHotspotsRef.current && !clickedHotspotsRef.current.contains(e.target)) {
                const itemNew = {...showTooltip};
                itemNew['firstClicks'] = false;
                itemNew['noClicks'] = false;
                itemNew['avgTTFC'] = false;
                itemNew['hotspots'] = false;
                setShowTooltip(itemNew);
            } 
         
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[tooltipRef, showTooltip, clickedFirstClicksRef, clickedNoClicksRef, clickedAvgTTFCRef, clickedHotspotsRef]);
                                                         
    return (<div className={styles.barCharsHeader}>
        <p>{statistics.firstClicks}
            <small ref={clickedFirstClicksRef} 
            onClick={() => showTootip('firstClicks')}
            onMouseEnter={() => showTootip('firstClicks')}
            onMouseLeave={() => showTootip('firstClicks')}  
            >{'First Clicks'}
                <i className={`ico-info-ico`} />
            </small>
            <TooltipStatisticsInfo
                tooltipRef={tooltipRef}
                showTooltip={showTooltip.firstClicks}
                contentClasses={styles.tooltipContent}
                title={'First Clicks'}
                description={'The total number of first interactions with your website or app on any device.'}
                />
        </p>
        <p>{statistics.noClicks}
            <small ref={clickedNoClicksRef}  
            onClick={() => showTootip('noClicks')}
            onMouseEnter={() => showTootip('noClicks')}
            onMouseLeave={() => showTootip('noClicks')} 
            >{'No Clicks'}
            <i className={`ico-info-ico`} />
            </small>
            <TooltipStatisticsInfo
                tooltipRef={tooltipRef} 
                showTooltip={showTooltip.noClicks}
                contentClasses={styles.tooltipContent}
                title={'No Clicks'}
                description={'Total number of visitors that haven’t clicked on your page during their session.'}
                />
        </p>
        <p>{hotspotsLength}
            <small ref={clickedAvgTTFCRef}  
            onClick={() => showTootip('hotspots')}
            onMouseEnter={() => showTootip('hotspots')}
            onMouseLeave={() => showTootip('hotspots')} 
            >{'Hotspots'}
            <i className={`ico-info-ico`} />
            </small>
            <TooltipStatisticsInfo
                tooltipRef={tooltipRef} 
                showTooltip={showTooltip.hotspots}
                contentClasses={styles.tooltipContent}
                title={'Hotspots'}
                description={'Total number of elements that have been clicked on your page.'}
                />
           
        </p>
        <p>{statistics.avgTTFC}
            <small ref={clickedHotspotsRef}  
            onClick={() => showTootip('avgTTFC')}
            onMouseEnter={() => showTootip('avgTTFC')}
            onMouseLeave={() => showTootip('avgTTFC')} 
            >{'Avg. TTFC'}
                <i className={`ico-info-ico`} />
            </small>
            <TooltipStatisticsInfo
                tooltipRef={tooltipRef} 
                showTooltip={showTooltip.avgTTFC}
                contentClasses={styles.tooltipContent}
                title={'Average Time to First Click'}
                description={'The time a visitor needed to act on your page.'}
                />
        </p>
    </div>)
}); 

export const StatsItem: FC<StatsElementProps> = memo(({
    clickedRef,
    tooltipRef,
    showTooltip,
    items,
    showTootip,
    sectionClasses
                        }) => {

    return (<>{items && items.map((el,i) => (
        <section key={i} className={sectionClasses}>
        <span  className={styles.statisticsText} >{el}</span>
        <small ref={clickedRef} onClick={() => showTootip(el)} className={styles.statisticsInfoText}>{'First Clicks'}
            <i className={`ico-info-ico ${styles.statisticsInfoIcon}`} />
            </small>
            <TooltipStatisticsInfo
            tooltipRef={tooltipRef} 
            showTooltip={showTooltip}
            title={'First Clicks'}
            contentClasses={styles.tooltipContent}
            description={'The total number of first interactions with your website or app on any device.'}
            />
    </section>
    )) }
    </>)
});

export const StatsSections: FC<StatsTypesProps> = memo(({
                                                        statistics, hotspotsLength
                                                     }) => {

    const tooltipRef = useRef<HTMLDivElement>();
    const clickedFirstClicksRef = useRef<any>();
    const clickedNoClicksRef = useRef<any>();
    const clickedAvgTTFCRef = useRef<any>();
    const clickedHotspotsRef = useRef<any>();
    const clickedExcludedRef = useRef<any>();
    const [showTooltip, setShowTooltip] = useState<any>({
        firstClicks: false,
        noClicks: false,
        avgTTFC: false,
        hotspots: false,
        excluded: false,
    });  

    const showTootip = useCallback((props: any) => {
        const newItem = {...showTooltip};
        const showItem = !newItem[props];
        setShowTooltip({
            
            ...showTooltip,
            [props]: showItem
           
        });
    }, [showTooltip]);

    
    useLayoutEffect(() => {
        const handleClickOutside = (e: any) => {
          
            if(tooltipRef.current && !tooltipRef.current.contains(e.target) && 
            clickedFirstClicksRef.current && !clickedFirstClicksRef.current.contains(e.target) && 
            clickedNoClicksRef.current && !clickedNoClicksRef.current.contains(e.target) &&
            clickedAvgTTFCRef.current && !clickedAvgTTFCRef.current.contains(e.target) && 
            clickedHotspotsRef.current && !clickedHotspotsRef.current.contains(e.target) && 
            clickedExcludedRef.current && !clickedExcludedRef.current.contains(e.target)) {
                const itemNew = {...showTooltip};
                itemNew['firstClicks'] = false;
                itemNew['noClicks'] = false;
                itemNew['avgTTFC'] = false;
                itemNew['hotspots'] = false;
                itemNew['excluded'] = false;
                setShowTooltip(itemNew);
            } 
         
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[tooltipRef, showTooltip, clickedFirstClicksRef, clickedNoClicksRef, clickedAvgTTFCRef, clickedHotspotsRef, clickedExcludedRef]); 

    return (
        <div className={styles.statisticsSectionsInfo}>
        <section className={styles.firstClickSection}>
            <span  className={styles.statisticsText} >{statistics.firstClicks}</span>
            <small ref={clickedFirstClicksRef} 
                onClick={() => showTootip('firstClicks')}
                onMouseEnter={() => showTootip('firstClicks')}
                onMouseLeave={() => showTootip('firstClicks')}
            className={styles.statisticsInfoText}>{'First Clicks'}
                <i className={`ico-info-ico ${styles.statisticsInfoIcon}`} />
                </small>
                <TooltipStatisticsInfo
                tooltipRef={tooltipRef} 
                showTooltip={showTooltip.firstClicks}
                title={'First Clicks'}
                contentClasses={styles.tooltipContent}
                description={'The total number of first interactions with your website or app on any device.'}
                />
        </section>
        <section className={styles.noClicksSection}>
            <span  className={styles.statisticsText} >{statistics.noClicks}</span>
            <small ref={clickedNoClicksRef} 
                onClick={() => showTootip('noClicks')}
                onMouseEnter={() => showTootip('noClicks')}
                onMouseLeave={() => showTootip('noClicks')}
             className={styles.statisticsInfoText}>{'No Clicks'}
                <i className={`ico-info-ico ${styles.statisticsInfoIcon}`} />
            </small>
            <TooltipStatisticsInfo
                tooltipRef={tooltipRef} 
                showTooltip={showTooltip.noClicks}
                contentClasses={styles.tooltipContent}
                title={'No Clicks'}
                description={'Total number of visitors that haven’t clicked on your page during their session.'}
                />
        </section>
        <section className={styles.avgTTFCSection}>
            <span className={styles.statisticsText} >{statistics.avgTTFC}</span>
            <small ref={clickedAvgTTFCRef} 
                onClick={() => showTootip('avgTTFC')}
                onMouseEnter={() => showTootip('avgTTFC')}
                onMouseLeave={() => showTootip('avgTTFC')}
             className={styles.statisticsInfoText}>{'Avg. TTFC'}
                <i className={`ico-info-ico ${styles.statisticsInfoIcon}`} />
            </small>
            <TooltipStatisticsInfo
                tooltipRef={tooltipRef} 
                showTooltip={showTooltip.avgTTFC}
                contentClasses={styles.tooltipContent}
                title={'Average Time to First Click'}
                description={'The time a visitor needed to act on your page.'}
                />
        </section>
        <section className={styles.hotspotsSection}>
            <span  className={styles.statisticsText} >{hotspotsLength}</span>
            <small ref={clickedHotspotsRef} 
                onClick={() => showTootip('hotspots')} 
                onMouseEnter={() => showTootip('hotspots')}
                onMouseLeave={() => showTootip('hotspots')}
            className={styles.statisticsInfoText}>{'Hotspots'}
                <i className={`ico-info-ico ${styles.statisticsInfoIcon}`} />
            </small>
            <TooltipStatisticsInfo
                tooltipRef={tooltipRef} 
                showTooltip={showTooltip.hotspots}
                contentClasses={styles.tooltipContent}
                title={'Hotspots'}
                description={'Total number of elements that have been clicked on your page.'}
                />
        </section>
        <section className={styles.excludedSection}>
            <span  className={styles.statisticsText} >{statistics.excluded}</span>
            <small ref={clickedExcludedRef} 
            onClick={() => showTootip('excluded')}
            onMouseEnter={() => showTootip('excluded')}
            onMouseLeave={() => showTootip('excluded')} 
            className={styles.statisticsInfoText} >{'Excluded elements'}
                <i className={`ico-info-ico ${styles.statisticsInfoIcon}`} />
            </small>
            <TooltipStatisticsInfo
                tooltipRef={tooltipRef} 
                showTooltip={showTooltip.excluded}
                contentClasses={styles.tooltipContent}
                title={'Excluded elements'}
                description={'Elements on your page we don’t track first clicks for.'}
                />
        </section>

    </div>)
});
interface HotspotsProps {
    hotspots: HotspotsType[];
    toggleSwitch: () => void;
    statisticsToggle: boolean;
    htmlData: string;
    viewMore: number;
    viewMoreHotspots: Function;
    isMobile: boolean;
}
///View More
export const HotspotsSections: FC<HotspotsProps> = memo(({
                                                            statisticsToggle,
                                                               hotspots,
                                                             toggleSwitch,
                                                             htmlData, viewMore, viewMoreHotspots, isMobile
                                                        }) => {
    return (
        <div className={styles.statisticsInner}>
            <div className={styles.frameHolder}
                style={statisticsToggle ? {width: `75%`} : {width: `100%`}}>
               <div className={styles.controllerSentEvents}
                    style={statisticsToggle ? {margin: `0`} : {margin: `0 124px`}}>
                   <a href={'/'} title={'some contr'}>
                       <i className={'ico-pause-page-click'} />
                       {'Pause monitoring this page'}
                   </a>
                   <a href={'/'} title={'some contr'}>
                       {'Website seems broken? Retake webpage or Contact Support'}
                   </a>
               </div>

               <section className={styles.frameContent}
                        style={statisticsToggle ? {margin: `0`} : {margin: `0 124px`}}>

                   {htmlData && <div className={styles.wprSite}
                                            dangerouslySetInnerHTML={{__html: htmlData}}
                   />}
               </section>
           </div>

            {!isMobile && <div className={styles.statisticsHotspotsSection}
                 style={statisticsToggle ? {right: `5px`} : {right: `5px`, zIndex: 1 , position: `absolute`}}>
                <h4 onClick={() => toggleSwitch()} className={styles.headerSection}>
                        <i  style={statisticsToggle ? {left: `20px`, top: `0`} : {right: `30px`, zIndex: 1 , position: `absolute`}} 
                        className={`ico-target-click-ico ${styles.iconTargetClick}`} />
                    { statisticsToggle &&
                        <span className={styles.text}>{'Hotspots'}</span>}
                    { statisticsToggle &&
                        <i  className={`ico-arrow-RIGHT-ico ${styles.iconArrowRight}`}/>
                    }
                </h4>
                <ul style={statisticsToggle ? {display: `flex`} : {display: `none`}} className={styles.statisticsHotspotsList}>
                        {hotspots && hotspots.filter((el, i) => i < viewMore).map(el => (
                            <li key={el.id}>
                                <small>{`#${el.id}`}</small>
                                <small style={{backgroundColor: `${getHotToCoolColorGradient(el.percentile, hotspots)}`}} 
                                       className={styles.iconHotspots}>{''}
                                </small>
                                <small>{`${el.percentile} %`}</small>
                                <small>{el.number}</small>
                            </li>
                        ))}
                        {hotspots.length !== viewMore && 
                        <button onClick={() => viewMoreHotspots()} className={styles.viewMore}>
                            {`View ${hotspots.length - 10} More`}
                        </button>}
                    </ul>
            </div>}
    </div>
    )
});

const Statistics = (props: Props) => {
    const {statsTypes} = props;
    const dispatch = useDispatch();
    const switchToggleStats = useStatisticsToggle();
    const statisticsToggle: boolean = useStatisticsToggle();
    const statisticsSwitch: boolean = useStatisticsSwitch();
    const isMobile = detectMobile();
    const [viewMore, setViewMore] = useState<number>(10);
    const [mobile, setMobile] = useState<boolean>(false);

    const toggleSwitch = useCallback(() => { 
        dispatch(toggleStats(switchToggleStats));
    },[dispatch, switchToggleStats]);

    const viewMoreHotspots = useCallback(() => { 
        setViewMore(statsTypes.hotspots.length);
    },[statsTypes.hotspots]);

    useEffect(() => {
      ///  console.log(window.innerWidth)
        if(window.innerWidth < 768 || isMobile) {
            setMobile(true);
            dispatch(toggleStats(true));
        }
    }, [isMobile, dispatch])

    return(statsTypes && <div className={styles.statisticsWrapper}>
        {    statisticsSwitch ?   <>
                <StatsSections  
                    statistics={statsTypes.statistics} 
                    hotspotsLength={statsTypes.hotspots.length} 
                />
                <HotspotsSections 
                    htmlData={statsTypes.processed.html}  
                    statisticsToggle={statisticsToggle} 
                    toggleSwitch={toggleSwitch} 
                    hotspots={statsTypes.hotspots}
                    viewMore={viewMore}
                    viewMoreHotspots={viewMoreHotspots}
                    isMobile={mobile} 
                />
                </> : 
                <>
                    <div className={styles.containerBarChars}>
                        <HeaderBarStatsSections statistics={statsTypes.statistics} 
                        hotspotsLength={statsTypes.hotspots.length} />
                        <div className={styles.charBar}><Bar dailyStatistics={statsTypes.dailyStatistics} /> </div>
                    </div>
                    <Recorded hotspots={statsTypes.hotspots}/>
                </>
        }
        </div>)
};
export default memo(Statistics);
