
import { Gender } from "./gender.enum"


export class Company{
    constructor(
    public email: string,
    public ceoFirstName: string,
    public ceoLastName: string,
    public password: string,
    public username: string
    ){}
}