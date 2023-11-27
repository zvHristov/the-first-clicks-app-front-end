import {DashboardActions} from './dashboard.actions';
import DashboardService from './dashboard.service';

export const updateDashboard = (payload: any) => {
    return {
        type: DashboardActions.SET_DASHBOARD,
        payload
    }
}
export const setDashboard = (set: boolean) => {
    return {
        type: DashboardActions.SET_DASHBOARD,
        set
    }
}
export const errorDashboard = (error: boolean) => {
    return {
        type: DashboardActions.SET_DASHBOARD,
        error
    }
}


export const getDashboardData = () => {
    return (dispatch: Function) => {
        DashboardService.getDataDashboard().then(res => dispatch(updateDashboard(res)))
    }
}
