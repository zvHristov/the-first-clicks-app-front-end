

export const StatisticsActions = {
    TOGGLE_STATISTICS: '[STATISTICS] Open Statistics',
    SWITCH_STATISTICS: '[STATISTICS] Switch Statistics',
}
export interface IToggleStatistics {
    type: typeof StatisticsActions.TOGGLE_STATISTICS;
    toggle: boolean | null
}

export interface ISwitchStatistics {
    type: typeof StatisticsActions.SWITCH_STATISTICS;
    toggle: boolean | null
}

export type StatisticsActionsTypes = IToggleStatistics | ISwitchStatistics;
