import HTTP from "../../shared/http";
import {handleErrors} from '../../shared/common-functions'
import {ProjectsState, JobState, UpdateProjectRequestData, IUpdateProject} from './projectsType';
const ProjectsService = {
    getProjects: (): Promise<any> => {
        return HTTP.get(`project`)
            .then(res => handleErrors(res, [500, 400, 401]))
            .then( res => res.json())
            .then(res => 
                new ProjectsState(res))

    },
    getProject: (projectId: number): Promise<JobState> => {
        ///console.log(projectId, 'projectId get project..');
        return HTTP.get(`project/${projectId}`)
            .then(res => handleErrors(res, [500, 400, 401]))
            .then( res => res.json())
            .then(res => new JobState(res))

    },
    updateProject: (project: IUpdateProject): Promise<any> => {
        const editProject = new UpdateProjectRequestData(project)
        ///console.log(editProject, 'editProject updateProject..');
        return HTTP.post(`project`,{body: editProject})
            .then(res => handleErrors(res, [500, 400, 401]))
            .then( res => res.json())
            .then(res => 
               console.log(res)
                )

    }
};

export default Object.seal(ProjectsService);
