import {UserLoginData} from '../login/models/user-data';
export class UserState {

    logged: boolean;
    userData: UserLoginData;

    constructor({logged = false, userData = undefined}) {
        this.logged = logged;
        this.userData = userData;
    }
}