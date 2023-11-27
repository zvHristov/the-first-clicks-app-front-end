export interface IAddProject {
    domain: string;
    name: string;
    description: string;
}
export class CreateProjectRequestData {
    domain: string;
    name: string;
    description: string;
    parentId: boolean;
    createdAt: boolean;
    excludedElements: [];
    id: boolean;
    pageId: boolean;
    status: number;
    team: [];
    trackedVisitors: number;
    updated: string;

    constructor({domain = '', name = '', description = '', 
    parentId = null, createdAt = null, excludedElements = undefined, id = null, pageId = null, status = 0, 
    team = undefined, trackedVisitors = 0, updated = ''}) {
        this.domain = domain || '';
        this.name = name || '';
        this.description = description || '';
        
        this.parentId = parentId || null;
        this.createdAt = createdAt || null;
        this.excludedElements = excludedElements || [];

        this.id = id || null;
        this.pageId = pageId || null;
        this.status = status || 0;
        this.team = team || [];
        this.trackedVisitors = trackedVisitors || 0;
        this.updated = updated || null; ///TODO...




    }

}

export class AddProjectResponseData {
    id: number;
    constructor(data:any = {}) {
        console.log(data, 'res from ctreate')
        this.id = data;
    }
}