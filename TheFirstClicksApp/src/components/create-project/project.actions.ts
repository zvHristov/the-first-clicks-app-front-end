export const ProjectActions = {
    PROJECT_CREATE: '[CREATE PROJECT] Project Create',
    PROJECT_GET: '[CREATE PROJECT] Get Project',
    PROJECT_VALIDATE: '[CREATE PROJECT] Valid Project',
    PROJECT_SUCCESS: '[CREATE PROJECT] Project Success',
    PROJECT_ERROR: '[CREATE PROJECT] Project Error',
}

export interface IProjectCreate {
    type: typeof ProjectActions.PROJECT_CREATE;
    projectId: number
}

export interface IProjectGet {
    type: typeof ProjectActions.PROJECT_GET;
    status: boolean
}
export interface IProjectValidate {
    type: typeof ProjectActions.PROJECT_VALIDATE;
    payload: any
}

export interface IProjectSuccess {
    type: typeof ProjectActions.PROJECT_SUCCESS;
    payload: any
}
export interface IProjectError {
    type: typeof ProjectActions.PROJECT_ERROR;
    payload: any
}

export type ProjectActionsTypes =
    IProjectCreate | IProjectSuccess | IProjectGet |
    IProjectError | IProjectValidate;
