import APIResponseModel from "@/models/APIResponseModel";
import QueryModel from "@/models/QueryModel";
import APIClient from "./APIClient";
import CategoryModel from "@/models/CategoryModel";

const getAllCategory = (): Promise<APIResponseModel<CategoryModel[]>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<APIResponseModel<CategoryModel[]>>(
        "/public/category/all"
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { getAllCategory };
