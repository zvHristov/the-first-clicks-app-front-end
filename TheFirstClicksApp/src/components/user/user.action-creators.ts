import {UserActions} from './user.actions';
import AuthService from "../../shared/auth/auth.service";
import {ILoginResponse} from '../login/models/user-data';

export const loginUser = (payload: boolean) => {
    return {
        type: UserActions.USER_LOGIN,
        payload
    }
}

export const setUserLoggedData = (data: ILoginResponse) => {
    AuthService.setUserDataObject(data);

    return {
        type: UserActions.SET_USER_DATA,
        payload: {
            ...AuthService.getUserData(),
            ...data,
        }
    }
};

export const logoutUser = (payload: boolean) => {
    return {
        type: UserActions.USER_LOGOUT,
        payload
    }
}


export const userLogged = (logged: boolean) => {
    return (dispatch: Function) => {
      dispatch(loginUser(logged))
    }
}

export const userLogout = (logged: boolean) => {
    return (dispatch: Function) => {
      dispatch(logoutUser(logged))
    }
}