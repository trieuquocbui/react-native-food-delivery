import APIResponseModel from "@/models/APIResponseModel";
import OrderModel from "@/models/OrderModel";
import APIClient from "./APIClient";
import PagenationResponseModel from "@/models/PagenationResponseModel";
import QueryModel from "@/models/QueryModel";

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

const editOrderStatus = (
  orderId: string,
  status: number
): Promise<APIResponseModel<OrderModel>> => {
  return new Promise(async (resovle, reject) => {
    try {
      let result = await APIClient.put<APIResponseModel<OrderModel>>(
        `/public/order/${orderId}/edit/status`,
        { status: status }
      );
      resovle(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getStatusOrderList = (
  params: QueryModel,
  status: number
): Promise<APIResponseModel<PagenationResponseModel<OrderModel[]>>> => {
  return new Promise(async (resovle, reject) => {
    try {
      let result = await APIClient.get<
        APIResponseModel<PagenationResponseModel<OrderModel[]>>
      >(`/order/list/${status}`, { params: params });
      resovle(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getOrder = (orderId: string): Promise<APIResponseModel<OrderModel>> => {
  return new Promise(async (resovle, reject) => {
    try {
      console.log(orderId);
      let result = await APIClient.get<APIResponseModel<OrderModel>>(
        `/public/order/${orderId}`
      );
      resovle(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { createOrder, editOrderStatus, getStatusOrderList, getOrder };
