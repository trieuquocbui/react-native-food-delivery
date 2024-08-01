import OrderModel from "./OrderModel";

export default class AssignmentModel {
  _id!: string;
  admin?: UserModel;
  employee!: UserModel;
  order!: OrderModel;
  assignedAt?: Date;
  status?: boolean;
}
