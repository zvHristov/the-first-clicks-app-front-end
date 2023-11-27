import {ILoginResponse} from '../login/models/user-data';

export const UserActions = {
    USER_LOGIN: '[USER] User loging',
    USER_LOGOUT: '[USER] User logout',
    SET_USER_DATA: '[USER] Set User data',

}


export interface IUserLogin {
    type: typeof UserActions.USER_LOGIN;
    payload: any
}

export interface IUserLogout {
    type: typeof UserActions.USER_LOGIN;
    payload: any
}

export interface IUserLoggedData {
    type: typeof UserActions.SET_USER_DATA;
    payload: ILoginResponse
}

export type UserActionsTypes = IUserLogin | IUserLogout | IUserLoggedData;