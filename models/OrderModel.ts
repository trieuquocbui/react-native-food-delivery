import OrderDetailsModel from "./OrderDetails";

export default class OrderModel {
  _id?: string;
  fullName!: string;
  phoneNumber!: string;
  totalAmount!: number;
  shipping!: number;
  status!: number;
  address1!: string;
  address2!: string;
  latitude!: number;
  longitude!: number;
  createdAt?: Date;
  customer?: UserModel;
  orderDetails!: OrderDetailsModel[];
}
