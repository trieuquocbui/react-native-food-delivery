export default class AccountModel {
  _id?: string;
  username!: string;
  password!: string;
  conformPassword!: string;
  thumbnail?: string;
  status?: number;
  user: UserModel = new UserModel();
}
