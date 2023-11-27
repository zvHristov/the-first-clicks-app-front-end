import HTTP from "../http";
import {handleErrors, removeLocalStorageItem, getLocalStorageItem,setLocalStorageItem} from "../common-functions";
import jwt_decode from 'jwt-decode';
import {UserLoginData} from '../../components/login/models/user-data';
import {LoginRequest} from '../../components/login/models/login.request';
import {UserLoginResponseData} from '../../components/login/models/user-login-response-data';
import {RegisterRequest} from '../../components/registration/models/register.request';
import {RegisterResponseData} from '../../components/registration/models/register-response-data';

class AuthServiceSingleton {
    private tokenKey = 'token';
    private tokenExpKey = 'tokenExp';
    private userDataKey = 'userData';

    static instance: AuthServiceSingleton;

    constructor() {
        if (!AuthServiceSingleton.instance) {
            AuthServiceSingleton.instance = this;
        }

        return AuthServiceSingleton.instance;
    }
    public login({email, password}: any): Promise<UserLoginResponseData> {
        return HTTP.post('login', {body: new LoginRequest(email, password)})
            // .then(res => {
            //     const token = res.headers.get('Аthorization');
            //     console.log(res, token, 'res, headers => token')
            //     console.log(res.headers, ' <== res.headers')
            //     // if (token && token.length) {
            //     // this.decodeAndPersistToken(token);
                   
            //     // } else {
            //     //     console.error("Authorization header error");
            //     // }
                
            //     return res;
            // })
            .then(res => handleErrors(res, [401]))
            .then(res => res.json())
            .then(res => {
             console.log(res)
           
                this.setUserData(res);
                return new UserLoginResponseData(res);
            })
    }

    public register({email, password}: any): Promise<RegisterResponseData> {
        return HTTP.put('account', {body: new RegisterRequest(email, password)})
            .then(res => res)
            .then(res => handleErrors(res, [401, 500]))
            .then(res => res.json())
            .then(res => new RegisterResponseData(res));
    }
    
    public getToken() {
        return getLocalStorageItem(this.tokenKey);
    }

    private setToken(token: string) {
        setLocalStorageItem(this.tokenKey, token);
    }

    public isTokenExpired() {
        const tokenExpirationSeconds = this.getTokenExp();

        return tokenExpirationSeconds && tokenExpirationSeconds * 1000 <= Date.now();
    }

    public logout(): void {
        this.clearAll();
    }

    public getUserData() {
        return getLocalStorageItem(this.userDataKey) || {};
    }

    public setUserDataObject(data: any){
        setLocalStorageItem(this.userDataKey, {
            ...getLocalStorageItem(this.userDataKey),
            ...data
        });
    }

    public decodeAndPersistToken(token: string) {
        console.log(token, 'token')
        // const decodedToken: any = jwt_decode(token);
        // console.log(decodedToken, 'decodedToken')
        this.setToken(token);
        // this.setTokenExp(decodedToken.exp);
        this.setUserData(token);

        return token;
    }
    
    private setUserData(data: any) {
        console.log(data, 'res')
        const userData = new UserLoginData({
            ...this.getUserData(),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        });
        setLocalStorageItem(this.userDataKey, userData);
    }

    public isUserLogged() {
        const user = this.getUserData();
        console.log(user, 'user isUserLogged')
        if (user.hasOwnProperty('email')) { 
            return true;
        } else {
            return false;
        }
    }

    private setTokenExp(tokenExp: number) {
        setLocalStorageItem(this.tokenExpKey, tokenExp);
    }

    private getTokenExp() {
        return getLocalStorageItem(this.tokenExpKey);
    }

    private clearAll() {
        removeLocalStorageItem(this.userDataKey);
    }
}


const AuthService = new AuthServiceSingleton();
Object.freeze(AuthService);

export default AuthService;