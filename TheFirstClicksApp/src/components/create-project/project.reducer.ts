import {ProjectActions,
    IProjectCreate, IProjectValidate, IProjectError, IProjectGet,
    ProjectActionsTypes} from "./project.actions";
import {ProjectState} from "./models/projectType";
///type store
const initialState: ProjectState = new ProjectState({
    projectFlow: {
        project: true,
        snippet: false,
        jobs: false
    },
    projectSuccess: null,
    projectError: null,
    validateProject: false
});
export const ProjectReducer = (
    state: ProjectState = initialState,
    action: ProjectActionsTypes
) => {
    switch (action.type) {
        case ProjectActions.PROJECT_CREATE:
            return {
            ...state,
            projectSuccess: (action as IProjectCreate).projectId,
                validateProject: true,
                projectFlow: {
                    snippet: true,
                }
            }
        case ProjectActions.PROJECT_VALIDATE:
            return {
                ...state,
                validateProject: (action as IProjectValidate).payload
            }
        case ProjectActions.PROJECT_GET:
           return {
                    ...state,
                    projectFlow: {
                        jobs: (action as IProjectGet).status
                    }
            }
        case ProjectActions.PROJECT_ERROR:
            return {
                ...state,
                projectError: (action as IProjectError).payload
            }
        default:
            return state;
    }
}
