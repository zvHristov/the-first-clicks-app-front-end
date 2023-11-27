export class RegisterResponseData {
    createdAt: string;
   

    constructor({createdAt = ''}) {
        this.createdAt = createdAt;
    }
}