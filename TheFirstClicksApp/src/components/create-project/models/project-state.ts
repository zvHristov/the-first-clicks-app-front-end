import {ProjectTeam} from '../../projects/projectsType';

export interface ProjectValid {
    description: string;
    outcome: boolean;
}
export class ProjectValidResponseData {
    data: ProjectValid;
    constructor({data = undefined}) {
        this.data = data;
    }
}

export interface ProjectResponseState {
    id: number;
    name: string;
    description: string;
    pageId: number;
    thumbnail: boolean;
    status: number;
    updated: string;
    domain: string;
    parentId: number;
    trackedVisitors: number;
    excludeElements: string[];
    createdAt: string;
    team: ProjectTeam[];

}

export class GetProjectResponseData {

    id: number;
    name: string;
    description: string;
    pageId: number;
    thumbnail: boolean;
    status: number;
    updated: string;
    domain: string;
    parentId: number;
    trackedVisitors: number;
    excludeElements: string[];
    createdAt: string;
    team: ProjectTeam[];

    constructor(data: any =
                    {
                        description: undefined,
                        id: undefined,
                        name: undefined,
                        pageId: undefined,
                        status: undefined,
                        thumbnail: undefined,
                        updated: undefined,
                        domain: undefined,
                        trackedVisitors: undefined,
                        excludeElements: undefined,
                        createdAt: undefined,
                        team: undefined,
                        parentId: undefined
                    }) {
        this.description = data.description || null;
        this.id = data.id || null;
        this.name = data.name || null;
        this.pageId = data.pageId || null;
        this.status = data.status || null;
        this.thumbnail = data.thumbnail || null;
        this.updated = data.updated || null;
        this.domain =  data.domain;
        this.parentId = data.parentId;
        this.trackedVisitors = data.trackedVisitors;
        this.excludeElements = data.excludeElements
        this.createdAt = data.createdAt;
        this.team = data.team;
    }

}
