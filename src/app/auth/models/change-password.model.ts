export class ChangePassword {
  public id: string;
  public token: string;
  public password: string;
  constructor(init?: Partial<ChangePassword>) {
    Object.assign(this, init);
  }
}
