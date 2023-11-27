import {JobActions} from './job.actions';
import ProjectsService from '../projects.service';


export const getProject = (payload: any) => {
    return {
        type: JobActions.JOB_GET,
        payload
    }
}

export const succesJob = (payload: any) => {
    return {
        type: JobActions.JOB_SUCCESS,
        payload
    }
}
export const errorJob = (payload: any) => {
    return {
        type: JobActions.JOB_ERROR,
        payload
    }
}


export const getProjectById = (id: number) => {
    return (dispatch: Function) => {
        ProjectsService.getProject(id)
            .then(res => 
         
                   //TODO remove them, add login about valid project console.log(res, 'res:: =--validProject')
                dispatch(getProject(res))).then(() => {
                    dispatch(succesJob(true));
                })
            // .catch(error => dispatch(errorProject(error)));
    }
}