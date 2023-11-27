export class UserLoginResponseData {
    email: string;
    firstName: string;
    lastName: string;
    jobPosition: string;
    timezone: string;
    language: string;
    userPermissions: string;

    constructor({email = '', firstName = '', lastName = '', 
    jobPosition = '', timezone = '', language = '', userPermissions = ''}) {
      
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobPosition = jobPosition;
        this.timezone = timezone;
        this.language = language;
        this.userPermissions = userPermissions;
    }
}