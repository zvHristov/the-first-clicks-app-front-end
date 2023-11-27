export const LoginActions = {
    LOGIN: '[LoginActions] Login',
    REGISTER: '[REGISTER] Register',
    LOGIN_SUCCESS: '[LoginActions] Login success',
    LOGIN_ERROR: '[LoginActions] Login error',
    LOGOUT: '[LoginActions] Logout',
    LOGOUT_SUCCESS: '[LoginActions] Logout success',
    LOGOUT_ERROR: '[LoginActions] Logout error'
};

export interface ILogin {
    type: typeof LoginActions.LOGIN,
}

export interface IRegister {
    type: typeof LoginActions.REGISTER,
}

export interface ILoginSuccess {
    type: typeof LoginActions.LOGIN_SUCCESS,
}

export interface ILoginError {
    type: typeof LoginActions.LOGIN_ERROR,
}

export interface ILogout {
    type: typeof LoginActions.LOGOUT;
}

export interface ILogoutSuccess {
    type: typeof LoginActions.LOGOUT_SUCCESS,
}

export interface ILogoutError {
    type: typeof LoginActions.LOGOUT_ERROR,
}

export type LoginActionsUnion = ILogin | IRegister | ILoginSuccess| ILoginError |
 ILogout | ILogoutSuccess | ILogoutError;
