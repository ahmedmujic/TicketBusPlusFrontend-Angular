import { Gender } from './gender.enum';
export class UserRegister {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  gender: Gender;
  constructor(init?: Partial<UserRegister>) {
    Object.assign(this, init);
  }
}
