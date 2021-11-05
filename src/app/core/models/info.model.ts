export class InfoEmail{
    email:string;
    message: string;
    fullName: string;
    phone: string;
    constructor(init?:Partial<InfoEmail>){
        Object.assign(this, init);
    }
}