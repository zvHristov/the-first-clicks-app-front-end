import HTTP from "../../shared/http";
import {handleErrors} from '../../shared/common-functions'
import {CreateProjectRequestData, AddProjectResponseData, IAddProject} from "./models/create-project";
import {ProjectValidResponseData} from "./models/project-state";

const ProjectService = {
    hasProject: (projectId: string ): Promise<any> => {

      ///  console.log(projectId, 'createProject'); ///TODO get params
        return HTTP.get(`validate/project/${projectId}`)

            .then(res => handleErrors(res, [400]))
            .then( res => res.json())
            .then(res => {
               
                return new ProjectValidResponseData(res);
            })

    },
    addProject: (data: IAddProject ): Promise<AddProjectResponseData> => {
        const project = new CreateProjectRequestData(data);
        return HTTP.put('project' , {body: project})
            .then(res => handleErrors(res, [500, 400]))
            .then( res => res.json())
            .then(res => new AddProjectResponseData(res))
    }
};

export default Object.seal(ProjectService);
