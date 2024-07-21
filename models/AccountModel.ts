export default class AccountModel {
  username!: string;
  password!: string;
  conformPassword!: string;
  thumbnail?: string;
  status?: number;
  user: UserModel = new UserModel();
}
