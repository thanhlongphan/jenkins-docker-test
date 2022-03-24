export class User {
  id: number;
  firstname : string;
  lastname: string;
  password: string;
  email: string;
  role: string;
  frozen: boolean;
  urlaubstage: number;


  public get userId() {
    return this.id;
  }

  public get firstName() {
    return this.firstname;
  }
}
