import ProductModel from "./ProductModel";

export default class OrderDetailsModel {
  _id?:string;
  product!: string | ProductModel;
  quantity!: number;
  price!: number;
}
