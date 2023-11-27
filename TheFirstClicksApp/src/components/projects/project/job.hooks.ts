import {useSelector} from 'react-redux';
import {State} from "../../../store/types";

export const useSelectorProject = () => {
    return useSelector((state: State) => {
        return state.experiment.project && state.experiment.project;
    })
}

export const useSelectorExcludeElementsProject = () => {
    return useSelector((state: State) => {
        return state.experiment.project && state.experiment.project.excludeElements;
    })
}

export const useSelectorTeamProject = () => {
    return useSelector((state: State) => {
        return state.experiment.project && state.experiment.project.team;
    })
}