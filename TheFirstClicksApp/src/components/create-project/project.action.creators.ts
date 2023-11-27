import {ProjectActions} from "./project.actions";
import ProjectService from "./project.service";
import ProjectsService from '../projects/projects.service';
import {IAddProject} from "./models/create-project";
import {ProjectValid, ProjectResponseState} from './models/project-state';

export const validateProject = (payload: ProjectValid) => {
    return {
        type: ProjectActions.PROJECT_VALIDATE,
        payload
    }
}

export const createProject = (projectId: number) => {
    return {
        type: ProjectActions.PROJECT_CREATE,
        projectId
    }
}

export const verifyProject = (status: boolean) => {
    return {
        type: ProjectActions.PROJECT_GET,
        status
    }
}

export const errorProject = (error: any) => {
    return {
        type: ProjectActions.PROJECT_ERROR,
        error
    }
}


export const validProject = (project: string) => {
  console.log(project, 'validProject in action create')
    return (dispatch: Function) => {
        ProjectService.hasProject(project)
            .then( res =>
                   //TODO remove them, add login about valid project console.log(res, 'res:: =--validProject')
                dispatch(validateProject(res)
                ))
          .catch(error => dispatch(errorProject(error.status)));
    }
}

export const addProject = (project: IAddProject) => {
  
    return (dispatch: Function) => {
        ProjectService.addProject(project).then((res) => {
            console.log(res, 'return res add project to state')
            dispatch(createProject(res.id))
        }).catch(error => dispatch(errorProject(error)));
    }
}

export const getProject = (projectId: number) => {
    /// console.log(addProject, 'add project action c addProject')
     return (dispatch: Function) => {
        ProjectsService.getProject(projectId).then((res) => {
           console.log(res, 'res from server')
       
             dispatch(verifyProject(true))
             
         });
         ///.catch(error => dispatch(errorProject(error)));
     }
 }

