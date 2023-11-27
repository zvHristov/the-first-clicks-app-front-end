import {ProjectsActions} from './projects.actions';
import ProjectsService from './projects.service';
import {IUpdateProject} from './projectsType';

export const getProjects = (payload: any) => {
    return {
        type: ProjectsActions.PROJECTS_GET,
        payload
    }
}

export const succesProjects = (payload: any) => {
    return {
        type: ProjectsActions.PROJECTS_SUCCESS,
        payload
    }
}

export const errorProjects = (payload: any) => {
    return {
        type: ProjectsActions.PROJECTS_ERROR,
        payload
    }
}

export const updateProject = (payload: IUpdateProject) => {
    return {
        type: ProjectsActions.PROJECTS_UPDATE,
        payload
    }
}


export const expandedProjects = (name: any) => {
    return {
        type: ProjectsActions.PROJECTS_EXPANDED,
        name
    }
}

export const expandedAllProjects = (toggle: boolean) => {
    return {
        type: ProjectsActions.PROJECTS_EXPANDED_ALL,
        toggle
    }
}

export const toggleProjects = (name: any) => {
    return {
        type: ProjectsActions.PROJECTS_ACTIVE_PROJECT_SETTING,
        name
    }
}

export const showModalSnippedProjects = (name: any) => {
    return {
        type: ProjectsActions.PROJECTS_SHOW_SNIPPED_MODAL,
        name
    }
}



export const expandedProjectAction = (name: any) => {
        return (dispatch: Function) => {
           dispatch(expandedProjects(name))
        }
 }

export const expandedAllProjectAction = (toggle: boolean) => {
    return (dispatch: Function) => {
       dispatch(expandedAllProjects(toggle))
    }
}


export const showModalSnipperProjectAction = (name: boolean) => {
    return (dispatch: Function) => {
       dispatch(showModalSnippedProjects(name))
    }
}

 export const toggleProjectSettingsAction = (name: any) => {
    return (dispatch: Function) => {
       dispatch(toggleProjects(name))
    }
}

  
export const getAllProjects = () => {
      return (dispatch: Function) => {
          ProjectsService.getProjects()
              .then(res => 
           
                     //TODO remove them, add login about valid project console.log(res, 'res:: =--validProject')
                  dispatch(getProjects(res))).then(() => {
                      dispatch(succesProjects(true));
                  })
              // .catch(error => dispatch(errorProject(error)));
      }
  }

  export const editProject = (project: IUpdateProject) => {
    return (dispatch: Function) => {
        ProjectsService.updateProject(project)
            .then(res => 
         
                   //TODO remove them, add login about valid project console.log(res, 'res:: =--validProject')
                dispatch(updateProject(res))
                ).then(() =>   dispatch(succesProjects(true)));
            // .catch(error => dispatch(errorProject(error)));
    }
}




