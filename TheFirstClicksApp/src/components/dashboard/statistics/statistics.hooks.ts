import {useSelector} from 'react-redux';

import {State} from "../../../store/types";

export const useStatisticsToggle = () => {
    return useSelector((state: State) => {
        return state.statisticsToggle && state.statisticsToggle.toggle;
    })
}

export const useStatisticsSwitch = () => {
    return useSelector((state: State) => {
        return state.statisticsToggle && state.statisticsToggle.switchStatistics;
    })
}
