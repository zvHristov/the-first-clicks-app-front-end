
export interface IStateFlow {
    project: boolean;
    snippet: boolean;
    jobs: boolean;
}




export class ProjectState {
    projectAdd: any;
    projectFlow: IStateFlow;
    projectSuccess: number;
    projectError: any;
    validateProject: null;

    constructor({projectAdd = {}, projectFlow = undefined, projectSuccess = null, projectError = {},
                    validateProject = null}) {
        this.projectAdd = projectAdd;
        this.projectFlow = projectFlow;
        this.projectSuccess = projectSuccess;
        this.projectError = projectError;
        this.validateProject = validateProject;
    }
}
