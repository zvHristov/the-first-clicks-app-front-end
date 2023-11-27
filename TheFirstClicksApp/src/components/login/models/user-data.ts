export interface ILoginResponse {
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    timezone: string;
    language: string;
    userPermissions: string;
}


export class UserLoginData {
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    timezone: string;
    language: string;
    userPermissions: string;
    
    constructor({email = '', firstName = '', lastName = '', 
    position = '', timezone = '', language = '', userPermissions = ''}) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.timezone = timezone;
        this.language = language;
        this.userPermissions = userPermissions;
    }
}
