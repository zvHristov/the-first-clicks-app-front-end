import { IUserLogin, IUserLogout, UserActions, IUserLoggedData, UserActionsTypes} from "./user.actions";
import {UserState} from "./user.state";
import AuthService from '../../shared/auth/auth.service';
import {UserLoginData} from '../login/models/user-data';
///type store
const initialState: any = new UserState({
    logged: AuthService.isUserLogged(),
    userData: new UserLoginData({
        ...AuthService.getUserData(),
    }),
});

export const UserReducer = (
    state: UserState = initialState,
    action: UserActionsTypes
) => {
    switch (action.type) {
        case UserActions.USER_LOGIN:
            return {
                ...state,
                logged: (action as IUserLogin).payload
            }
            case UserActions.SET_USER_DATA: {
                return {
                    ...state,
                    userData: (action as IUserLoggedData).payload
                }
            }
            case UserActions.USER_LOGOUT:
                return {
                    ...state,
                    logged: (action as IUserLogout).payload,
                    userData: {}
                }
    
        default:
            return state;
    }
}
