import APIResponseModel from "@/models/APIResponseModel";
import OrderModel from "@/models/OrderModel";
import APIClient from "./APIClient";

const createOrder = (
  order: OrderModel
): Promise<APIResponseModel<OrderModel>> => {
  return new Promise(async (resovle, reject) => {
    try {
      let result = await APIClient.post<APIResponseModel<OrderModel>>(
        "/order/create",
        order
      );
      resovle(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { createOrder };
