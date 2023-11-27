
export interface ILoginRequest {
    email: string;
    password: string;
}
export class LoginRequest {
    constructor(private email: string,
                private password: string) {
    }
}