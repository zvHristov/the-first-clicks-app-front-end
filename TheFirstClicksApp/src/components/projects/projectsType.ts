
import {normalizeProjects, normalizeNameProject} from '../../shared/common-functions';


export interface GroupProjectsState {
  activeSettings: boolean;
  showModalSnipped: boolean;
  expanded:boolean;
  name: string;
}

export interface ProjectTeam {
  firstName: string;
  lastName:  string;
  email:  string;
  status: number;
  userPermissions: string;
  jobPossition:  string;
  timezone:  string;
  thumbnail:  string;
}
export interface GroupNameProjectState {
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

export class JobState {
  project: GroupNameProjectState;

    constructor(data: any = undefined) {
      this.project = data || {};
    }
    
}

export class ProjectsState {
  groups: any[any[any]];
  name: GroupProjectsState[];
  
    constructor(data: any = undefined) {
      this.groups = normalizeProjects(data);
      this.name = normalizeNameProject(data);
    }
    
}

export interface IUpdateProject {
  name?: string;
  description?: string;
  status?: number;
  team?: ProjectTeam[];
  excludedElements?: string[];
}


export class UpdateProjectRequestData {
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
      
      this.parentId = parentId || 'null';
      this.createdAt = createdAt || 'null';
      this.excludedElements = excludedElements || [];

      this.id = id || 'null';
      this.pageId = pageId || 'null';
      this.status = status || 0;
      this.team = team || [];
      this.trackedVisitors = trackedVisitors || 0;
      this.updated = updated || '2021-03-23'; ///TODO...




  }

}