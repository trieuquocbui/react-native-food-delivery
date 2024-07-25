import APIResponseModel from "@/models/APIResponseModel";
import CartDetailsModel from "@/models/CartDetailsModel";
import APIClient from "./APIClient";

const getCartDetailsList = (): Promise<
  APIResponseModel<CartDetailsModel[]>
> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get("/customer/cart-details/list");
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const editQuantityCartDetails = (
  cartDetailsId: string,
  quantity: number
): Promise<APIResponseModel<CartDetailsModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.put(
        `/customer/cart-details/${cartDetailsId}/edit`,
        { quantity }
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const createCartDetails = (data: {
  product: string;
}): Promise<APIResponseModel<CartDetailsModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.post("/customer/cart-details/create", data);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCartDetails = (cartDetailsId: {data:{_id:string}[]}): Promise<APIResponseModel<{_id:string}[]>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.delete("/customer/cart-details/delete", cartDetailsId);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  createCartDetails,
  deleteCartDetails,
  getCartDetailsList,
  editQuantityCartDetails,
};
