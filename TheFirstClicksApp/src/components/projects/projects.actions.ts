export const ProjectsActions = {
    PROJECTS_GET: '[PROJECTS] Projects Get',
    PROJECTS_UPDATE: '[PROJECTS] Projects Update',
    PROJECTS_SUCCESS: '[PROJECTS] Projects Success',
    PROJECTS_ERROR: '[PROJECTS] Projects Error',
    PROJECTS_EXPANDED: '[PROJECTS] Project expanded',
    PROJECTS_EXPANDED_ALL: '[PROJECTS] Project expanded all',
    PROJECTS_SHOW_SNIPPED_MODAL: '[PROJECTS] Project show snipped',
    PROJECTS_ACTIVE_PROJECT_SETTING: '[PROJECTS] Project active setting',
}


export interface IProjectsGet {
    type: typeof ProjectsActions.PROJECTS_GET;
    payload: any
}
export interface IProjectUpdate {
    type: typeof ProjectsActions.PROJECTS_UPDATE;
    payload: any
}
export interface IProjectsSuccess {
    type: typeof ProjectsActions.PROJECTS_GET;
    payload: any
}

export interface IProjectsError {
    type: typeof ProjectsActions.PROJECTS_GET;
    payload: any
}

export interface IProjectsExpanded {
    type: typeof ProjectsActions.PROJECTS_EXPANDED;
    name: any
}

export interface IProjectsExpandedAll {
    type: typeof ProjectsActions.PROJECTS_EXPANDED_ALL;
    toggle: boolean
}

export interface IProjectsShowModalSnipped {
    type: typeof ProjectsActions.PROJECTS_SHOW_SNIPPED_MODAL;
    name: any
}

export interface IProjectsProjectSetting {
    type: typeof ProjectsActions.PROJECTS_ACTIVE_PROJECT_SETTING;
    name: any
}

export type ProjectsActionsTypes = IProjectsGet | IProjectsError | IProjectsSuccess |
IProjectsExpanded | IProjectsProjectSetting | IProjectsShowModalSnipped | IProjectsExpandedAll |
IProjectUpdate;
