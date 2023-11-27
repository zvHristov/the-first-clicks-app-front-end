import {useSelector} from 'react-redux';

import {State} from "../../store/types";


export const useSelectorProjectFlow = () => {
    return useSelector((state: State) => {
        return state.addProject && state.addProject.projectFlow;
    })
}

export const useSelectorProjectSuccess = () => {
    return useSelector((state: State) => {
        return state.addProject && 
        state.addProject.projectSuccess && state.addProject.projectSuccess;
    })
}

export const useSelectorProjectValidDomain = () => {
    return useSelector((state: State) => {
        return state.addProject && state.addProject.validateProject;
    })
}
