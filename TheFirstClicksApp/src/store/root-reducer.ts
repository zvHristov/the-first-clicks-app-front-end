import { combineReducers } from 'redux';
import {InitActionUnion, InitStoreActions} from './actions';
import {dashboardReducer} from "../components/dashboard/dashboard.reducer";
import {State, InitApp} from "./types";
import {StatisticsReducer} from "../components/dashboard/statistics/statistics.reducer";
import {ProjectReducer} from "../components/create-project/project.reducer";
import {ProjectsReducer} from "../components/projects/projects.reducer";
import {UserReducer} from "../components/user/user.reducer";
import {JobReducer} from '../components/projects/project/job.reducer';

const initialState: InitApp = new InitApp({ });

const InitReducer = (state =  initialState, action: InitActionUnion): InitApp => {
    switch (action.type) {
        case InitStoreActions.SET_INIT_SUCCESS:
            return {
                ...state,
                ...(action as any).paylod
            }
        case InitStoreActions.PAGE_NOT_FOUND:
            return {
                ...state,
                pageNotFound: (action as any).payload
            };
        case InitStoreActions.CONTENT_NOT_AVAILABLE:
            return {
                ...state,
                contentNotAvailable: (action as any).payload
            };
        case InitStoreActions.INIT_ERROR:
            return {
                ...state,
                generalError: (action as any).error
            }
        case InitStoreActions.SET_SHOW_INIT_LOADER:
            const showInitLoader = (action as any).showInitLoader;

            if (showInitLoader === state.showInitLoader) {
                return state;
            }

            return {
                ...state,
                showInitLoader: showInitLoader
            };
        case InitStoreActions.SET_INIT:
            return {
                ...state,
                ...(action as any).paylod
            }
        default:
            return state;
    }
}

export const rootReducer = (asyncReducer = {}) => {
    let reducers = {
        init: InitReducer,
        dashboard: dashboardReducer,
        statisticsToggle: StatisticsReducer,
        addProject: ProjectReducer,
        experiments: ProjectsReducer,
        experiment: JobReducer,
        user: UserReducer,
        ...asyncReducer
    };
    return combineReducers<State>(reducers as any);
}
