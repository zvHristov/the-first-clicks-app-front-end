import {useSelector} from 'react-redux';

import {State} from "../../store/types";

export const useSelectorAllProjects = () => {
    return useSelector((state: State) => {
        return state.experiments && state.experiments;
    })
}

export const useSelectorProjectByGroup = (byGroup: number) => {
    return useSelector((state: State) => {
        return state.experiments && state.experiments.groups[byGroup];
    })
}

export const useSelectorProjectByGroupAllTeam = (byGroup: number) => {
    return useSelector((state: State) => {
        return state.experiments && state.experiments.groups[byGroup] &&
        state.experiments.groups[byGroup].flatMap(el => el.team);
    })
}

export const useSelectorGoupnNameProject = (byGroup: number) => {
    return useSelector((state: State) => {
        return state.experiments && state.experiments.name[byGroup];
    })
}

export const useSelectorAllGoupnNameProject = () => {
    return useSelector((state: State) => {
        return state.experiments && state.experiments.name;
    })
}

