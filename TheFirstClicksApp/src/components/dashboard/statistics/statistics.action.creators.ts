import {StatisticsActions} from "./statistics.actions";


export const openStatistics = (toggle: boolean) => {
    return {
        type: StatisticsActions.TOGGLE_STATISTICS,
        toggle
    }
}

export const switchStatistics = (toggle: boolean) => {
    return {
        type: StatisticsActions.SWITCH_STATISTICS,
        toggle
    }
}


export const toggleStats = (toggle: boolean) => {
    return (dispatch: Function) => {
       dispatch(openStatistics(!toggle))
    }
}

export const switchStats = (toggle: boolean) => {
    return (dispatch: Function) => {
       dispatch(switchStatistics(!toggle))
    }
}

