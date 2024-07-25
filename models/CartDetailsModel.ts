import ProductModel from "./ProductModel";

export default class CartDetailsModel {
  _id?: string;
  user?: UserModel;
  product?: ProductModel;
  quantity?: number;
  checked: boolean = false;
}
