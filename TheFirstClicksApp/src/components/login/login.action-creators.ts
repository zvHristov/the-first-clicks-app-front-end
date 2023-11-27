import {LoginActions} from './login.actions';
import {ILoginRequest} from './models/login.request';
import AuthService from '../../shared/auth/auth.service';
import {userLogged, userLogout, setUserLoggedData} from '../user/user.action-creators';


export const loginUser = (data: ILoginRequest) => {
    return (dispatch: any) => {
        dispatch({
            type: LoginActions.LOGIN
        });
        AuthService.login(data).then(res => {
            console.log(res, 'res loginUser')
            dispatch(loginUserSuccess(res));
        })
        .catch(error =>
            dispatch({
                type: LoginActions.LOGIN_ERROR
            })
            )
    };
};

///TODO... in the moment we has implements register pure flow to login... but can redesign !
export const registerUser = (data: ILoginRequest) => {
    return (dispatch: Function) => {
        dispatch({
            type: LoginActions.REGISTER
        });
        AuthService.register(data).then(res => {
           // console.log(res, 'd');
            dispatch(userRegisterSuccess(res));
        }).catch(error =>
            dispatch({
                type: LoginActions.LOGIN_ERROR
            })
            )
    };
};

export const loginUserSuccess = (payload: any) => {
    return (dispatch: Function) => {
          dispatch(userLogged(true));
          dispatch(setUserLoggedData(payload));
          dispatch({
            type: LoginActions.LOGIN_SUCCESS
            });
    }
    
};

export const userRegisterSuccess = (payload: any) => {
    return (dispatch: Function) => {
          ///TODO SERVICE login endpoint
        
        dispatch(userLogged(true));

          dispatch({
            type: LoginActions.LOGIN_SUCCESS
        });
        
    }
    
};

export const logoutUser = () => {
    return (dispatch: Function) => {
        dispatch({
            type: LoginActions.LOGOUT
        });
          ///TODO... SERVICE logout endpoint
          AuthService.logout();
          dispatch(userLogout(false));
    }
          
};

export const logoutUserSuccess = () => {
    return (dispatch: Function) => {
            dispatch({
                type: LoginActions.LOGOUT_SUCCESS
            });
           };
};