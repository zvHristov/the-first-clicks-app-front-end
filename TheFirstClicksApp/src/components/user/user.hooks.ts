import {useSelector} from 'react-redux';

import {State} from "../../store/types";

export const useSelectorIsUserLoggedInfo = () => {
    return useSelector((state: State) => {
        return state.user &&
        state.user.logged;
    })
}