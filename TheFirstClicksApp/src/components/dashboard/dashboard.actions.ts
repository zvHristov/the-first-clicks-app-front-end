
export const DashboardActions = {
    SET_DASHBOARD: '[DASHBOARD] Dashboard Set',
    SET_DASHBOARD_SUCCESS: '[DASHBOARD] Dashboard Success',
    DASHBOARD_ERROR: '[DASHBOARD] Dashboard Error',
}

export interface IDashboardSet {
    type: typeof DashboardActions.SET_DASHBOARD;
    payload: any
};
export interface IDashboardSuccess {
    type: typeof DashboardActions.SET_DASHBOARD_SUCCESS;
    payload: any
};
export interface IDashboardError {
    type: typeof DashboardActions.DASHBOARD_ERROR;
    error: boolean
};
export type DashboardActionsTypes = IDashboardSet | IDashboardSuccess | IDashboardError;
