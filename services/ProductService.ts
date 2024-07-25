import APIResponseModel from "@/models/APIResponseModel";
import PagenationResponseModel from "@/models/PagenationResponseModel";
import ProductModel from "@/models/ProductModel";
import QueryModel from "@/models/QueryModel";
import APIClient from "./APIClient";

const getProductList = (
  params: QueryModel
): Promise<APIResponseModel<PagenationResponseModel<ProductModel[]>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<
        APIResponseModel<PagenationResponseModel<ProductModel[]>>
      >("/public/products", { params: params });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getDetail = (
  productId: string
): Promise<APIResponseModel<ProductModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<APIResponseModel<ProductModel>>(
        `/public/product/${productId}`
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { getProductList, getDetail };
