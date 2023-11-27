export const InitStoreActions = {
    SET_INIT: '[INIT] Init App Store',
    SET_INIT_SUCCESS: '[INIT] Init Success Store',
    SET_SHOW_INIT_LOADER: '[INIT] Set Show Init Loader',
    INIT_ERROR: '[INIT] Init Error Store',
    PAGE_NOT_FOUND: '[INIT] Page not found',
    CONTENT_NOT_AVAILABLE: '[INIT] Content not available'
}

export interface ISetInit {
    type: typeof InitStoreActions.SET_INIT;
}

export interface ISetInitSuccess {
    type: typeof InitStoreActions.SET_INIT_SUCCESS;
    payload: any;
}

export interface ISetInitError {
    type: typeof InitStoreActions.INIT_ERROR;
    error: boolean;
}

export interface IPageNotFound {
    type: typeof InitStoreActions.PAGE_NOT_FOUND;
    payload: boolean;
}

export interface IContentNotAvailable {
    type: typeof InitStoreActions.CONTENT_NOT_AVAILABLE;
    payload: boolean;
}

export interface ISetShowInitLoader {
    type: typeof InitStoreActions.SET_SHOW_INIT_LOADER,
    showInitLoader: boolean
}



export type InitActionUnion = ISetInit | ISetInitSuccess | ISetInitError | IPageNotFound | ISetShowInitLoader 
| IContentNotAvailable;
