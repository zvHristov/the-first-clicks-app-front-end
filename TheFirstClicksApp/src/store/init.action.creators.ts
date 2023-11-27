import {InitStoreActions} from './actions';

//Action creators

export const initAppState = () => {
    return(dispatch: Function, getState: Function) => {
         dispatch(initAppStateSuccess({generalError: false}));
         dispatch(hideInitLoader());
    }
}


export const initAppStateSuccess = (payload: any) => {
    return {
        type: InitStoreActions.SET_INIT_SUCCESS,
        payload
    }
}

export const showPageNotFound = (show: boolean) => {
    return {
        type: InitStoreActions.PAGE_NOT_FOUND,
        payload: show
    };
};

export const hideInitLoader = () => {
    return {
        type: InitStoreActions.SET_SHOW_INIT_LOADER,
        showInitLoader: false
    };
};
