import React, {useMemo} from 'react';
import { ResponsiveBar } from '@nivo/bar';
import {DailyStatistics} from '../../../../../store/types';
import {TooltipDaily} from './tooltip-daily/tooltip-daily';
interface BarProps {
    dailyStatistics:  DailyStatistics[]
}

const Bar = (props: BarProps) => {
    const {dailyStatistics} = props;

    return (
        <ResponsiveBar
        data={dailyStatistics}
        keys={['firstClicks', 'avgTTFC', 'noClicks']}
        indexBy="date"
        margin={{ top: 10, right: 10, bottom:30, left:50 }}
        padding={0.9}
      
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#FA8461', '#EDF2F2', '#B3C7C7']}
        tooltip={({data}) => (<TooltipDaily data={data}  />)}
        theme={{
            tooltip: {
                container: {
                    background: '#FFFFFF',
                },
            },
        }}
        enableLabel={false}
        enableGridX={false}
        enableGridY={false}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        
        axisBottom={{
            tickSize: 1,
            tickPadding: 1,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32,
    
        }}
        axisLeft={{
            tickSize: 0,
            tickPadding: 2,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 0
        }}
        labelSkipWidth={6}
        labelSkipHeight={6}
        animate={true}
        motionStiffness={10}
        motionDamping={5}
    />
    )
};

export default Bar;