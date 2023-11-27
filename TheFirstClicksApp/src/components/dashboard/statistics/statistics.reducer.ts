import {StatisticsActions, IToggleStatistics, ISwitchStatistics,
    StatisticsActionsTypes} from './statistics.actions';

import {ToggleStatistics} from './statisticsType';

const initialState: ToggleStatistics = new ToggleStatistics({
    toggle: true,
    switchStatistics: true
});
export const StatisticsReducer = (
    state: ToggleStatistics = initialState,
    action: StatisticsActionsTypes
) => {
    switch (action.type) {

        case StatisticsActions.TOGGLE_STATISTICS:
            return {
                ...state,
                toggle: (action as IToggleStatistics).toggle

            }
            case StatisticsActions.SWITCH_STATISTICS:
                return {
                    ...state,
                    switchStatistics: (action as ISwitchStatistics).toggle
    
                }    
        default:
            return state;
    }

}


