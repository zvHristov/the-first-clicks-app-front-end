import {
     IProjectsError, IProjectsGet,
     IProjectsSuccess, IProjectsShowModalSnipped,
     IProjectsExpanded, IProjectsProjectSetting, IProjectsExpandedAll, IProjectUpdate ,
    ProjectsActionsTypes, ProjectsActions} from './projects.actions';
    import {ProjectsState} from './projectsType';

///type store
const initialState: any = new ProjectsState({
    groups: [],
    name: [],
    error: false,
    succes: false
});

export const ProjectsReducer = (
    state: ProjectsState = initialState,
    action: ProjectsActionsTypes
) => {
    
    switch (action.type) {
        case ProjectsActions.PROJECTS_ERROR:
            return {
                ...state,
                error: (action as IProjectsError).payload,
            
        }
        case ProjectsActions.PROJECTS_SUCCESS:
            return {
                ...state,
                succes: (action as IProjectsSuccess).payload,
            
        }
        case ProjectsActions.PROJECTS_GET:
            return {
                ...state,
                groups: (action as IProjectsGet).payload.groups,
                name: (action as IProjectsGet).payload.name,
            
        }
        case ProjectsActions.PROJECTS_UPDATE:
         ////   console.log((action as IProjectUpdate).payload, 'IProjectUpdate')
            return {
                ...state,
            
        }
        case ProjectsActions.PROJECTS_EXPANDED:
            let i = state.name.findIndex(gr => gr.name === (action as IProjectsExpanded).name.name);
            const newNameExpand = [...state.name];
            newNameExpand[i].expanded = !newNameExpand[i].expanded;
           
            return {
                ...state,
                name: newNameExpand
            
            }
        case ProjectsActions.PROJECTS_EXPANDED_ALL:
           const allExpand = [...state.name];
           allExpand.forEach(element => {
            element.expanded = (action as IProjectsExpandedAll).toggle
            });
            return {
                ...state,
                name: allExpand
            
            }        
        case ProjectsActions.PROJECTS_ACTIVE_PROJECT_SETTING:
            let indexSetting = state.name.findIndex(gr => gr.name === (action as IProjectsProjectSetting).name.name);
            const newSettings = [...state.name];
            newSettings[indexSetting].activeSettings = !newSettings[indexSetting].activeSettings;
          
            return {
                ...state,
                name: newSettings
            
            }

        case ProjectsActions.PROJECTS_SHOW_SNIPPED_MODAL:
            const inameSnipper = state.name.findIndex(gr => gr.name === (action as IProjectsShowModalSnipped).name.name);
            const newSnippedModal = [...state.name];
            newSnippedModal[inameSnipper].showModalSnipped = !newSnippedModal[inameSnipper].showModalSnipped;
            
            return {
                ...state,
                name: newSnippedModal
            
            }
        default:
            return state;
    }
}
