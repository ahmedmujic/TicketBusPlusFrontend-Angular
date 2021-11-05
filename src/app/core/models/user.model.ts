import { environment } from 'src/environments/environment';

export class User {
  public email?: string;
  public firstName?: string;
  public lastName?: string;
  public firstCeoName?: string;
  public lastCeoName?: string;
  public token?: string
  public role?: string;
  public userName?: string;
  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}

export class ActivateUser {
  constructor(public id: string, public token: string) { }
}

export class UserLogin {
  constructor(
    public email,
    public username,
    public password,
    public clientId = environment.clientId,
    public clientSecret = environment.clientSecret,
    public grantType = environment.grantType,
    public scope = environment.scope
  ) { }
}

export interface UserInfo {
  firstName: string,
  lastName: string,
  ceoFirstName: string,
  ceoLastName: string,
  email: string,
  token: string,
  role: string,
  userName: string
}