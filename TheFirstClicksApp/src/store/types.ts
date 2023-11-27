import {replaceHtml} from "../shared/common-functions";
import {ToggleStatistics} from "../components/dashboard/statistics/statisticsType";
import {ProjectState} from "../components/create-project/models/projectType";
import {ProjectsState, JobState} from "../components/projects/projectsType";
import {UserState} from "../components/user/user.state";
export interface IHtml {
    html: string;
}
export interface StatisticsType {
    avgTTFC: number;
    excluded: number;
    firstClicks: number;
    noClicks: number;
}

export interface DailyStatistics {
    avgTTFC: number;
    firstClicks: number;
    noClicks: number;
    date: string;
}
export interface  HotspotsType {
    id: number;
    percentile: number;
    number: number;
    color: string;
    recordedClicks: number;
    tagName: string;
    timeToFirstClick: string;
    time: string;
    location: string;
    href:  string;
    context:  string;
    className: string;
    idElement:  string;
}
export interface StatsTypes {
    statistics: StatisticsType;
    hotspots: HotspotsType[];
    dailyStatistics: DailyStatistics[];
    processed: IHtml;
    original: boolean;
}

export interface InfoType {
    title: string;
    description: string;
    url: string;
    id: number;
}

export class Information {
    title: string;
    description: string;
    url: string;
    id: string;


    constructor({title = '', description = '', url = '', id = ''}) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.id = id;

    }
}
export interface HtmlType {
    html: string;
}

class Html {
    html: any;

    constructor(data = {processed: undefined}) {
       this.html = replaceHtml(data);
    }
}
class Stats {
    statistics: StatisticsType;
    hotspots: HotspotsType[];
    dailyStatistics: DailyStatistics[];
    processed: any;
    original: boolean;

    constructor(data = {
        processed: undefined,
        hotspots: undefined,
        statistics: undefined,
        dailyStatistics: undefined,
        original: null}) {
          
        this.processed = new Html(data);
        this.hotspots = data.hotspots;
        this.statistics = data.statistics;
        this.dailyStatistics = data.dailyStatistics ?? [];
        this.original = data.original;
    }
}

export interface DevicesType {
    desktop: StatsTypes;
    tablet: StatsTypes;
    phone: StatsTypes;

}

class Devices {
    desktop: StatsTypes;
    tablet: StatsTypes;
    phone: StatsTypes;

    constructor(data = {desktop: undefined, tablet: undefined, phone: undefined}) {
        this.desktop = new Stats(data.desktop);
        this.tablet = new Stats(data.tablet);
        this.phone = new Stats(data.phone);
    }
}


export class Representation {
    info: any;
    devices: DevicesType;

    constructor(data: any = {
                    title: undefined,
                    description: undefined,
                    url: undefined,
                    id: undefined,
                    devices: undefined
    }) {
        this.info = new Information (data);
        this.devices = new Devices(data.devices);
    }
}

export class Dashboard {
    page: any;
    constructor(data: any = {project: undefined, dashboard: undefined}) {
        this.page = new Representation(data) || undefined;
    }
}

export class InitApp {
    showInitLoader: boolean;
    generalError: boolean;
    pageNotFound: boolean;
    contentNotAvailable: boolean;

    constructor({showInitLoader, generalError, pageNotFound, contentNotAvailable}: any) {
        this.showInitLoader = showInitLoader || true;
        this.generalError = generalError || false;
        this.pageNotFound = pageNotFound || false;
        this.contentNotAvailable = contentNotAvailable || false;
    }
}

export type State = {
    init: InitApp,
    dashboard: Dashboard,
    statisticsToggle: ToggleStatistics,
    addProject: ProjectState,
    experiments: ProjectsState,
    experiment: JobState,
    user: UserState,
}
