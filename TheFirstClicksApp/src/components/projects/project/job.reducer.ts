import {
    IJobError,
    IJobSuccess, IJobGet,
   JobActionsTypes, JobActions} from './job.actions';
   import {JobState} from '../projectsType';

///type store
const initialState: any = new JobState();

export const JobReducer = (
   state: JobState = initialState,
   action: JobActionsTypes
) => {
   
   switch (action.type) {
    case JobActions.JOB_ERROR:
           return {
               ...state,
               error: (action as IJobError).payload,
           
       }
    case JobActions.JOB_SUCCESS:
           return {
               ...state,
               succes: (action as IJobSuccess).payload,
           
       }

    case JobActions.JOB_GET:
       
        return {
            ...state,
            ...(action as IJobGet).payload,
            
        }
           

       default:
           return state;
   }
}
