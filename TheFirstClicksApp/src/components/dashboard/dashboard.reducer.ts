import {DashboardActions, IDashboardSet, IDashboardSuccess, DashboardActionsTypes}
from './dashboard.actions';
import {Dashboard} from "../../store/types";


export const DashboardReducer = (
    state: Dashboard,
    action: DashboardActionsTypes) => {
    switch (action.type) {
        case DashboardActions.SET_DASHBOARD:
            return {
                ...state,
                ...(action as IDashboardSet).payload
            }
        case DashboardActions.SET_DASHBOARD_SUCCESS:
            return {
                ...state,
                ...(action as IDashboardSuccess).payload
            }

        default:
            return state;
    }
}
export const dashboardReducer = (state: Dashboard, action: any) => {
    return {
        ...state,
        ...DashboardReducer(state, action),
    }
}
