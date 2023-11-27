export const JobActions = {
    JOB_SUCCESS: '[JOB] Job Success',
    JOB_ERROR: '[JOB] Job Error',
    JOB_GET: '[JOB] Job Get',
}

export interface IJobGet {
    type: typeof JobActions.JOB_GET;
    payload: any
}
export interface IJobSuccess {
    type: typeof JobActions.JOB_GET;
    payload: any
}

export interface IJobError {
    type: typeof JobActions.JOB_GET;
    payload: any
}

export type JobActionsTypes = IJobGet | IJobSuccess | IJobError;