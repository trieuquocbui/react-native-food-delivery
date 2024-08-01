import APIResponseModel from "@/models/APIResponseModel";
import PagenationResponseModel from "@/models/PagenationResponseModel";
import QueryModel from "@/models/QueryModel";
import APIClient from "./APIClient";
import AssignmentModel from "@/models/AssignmentModel";

const getAssignmentList = (
  params: QueryModel
): Promise<APIResponseModel<PagenationResponseModel<AssignmentModel[]>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<
        APIResponseModel<PagenationResponseModel<AssignmentModel[]>>
      >("/employee/assignment/list", { params: params });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getDetail = (
  assignmentId: string
): Promise<APIResponseModel<AssignmentModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<APIResponseModel<AssignmentModel>>(
        `/employee/assignment/${assignmentId}`
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getNewest = (): Promise<APIResponseModel<AssignmentModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<APIResponseModel<AssignmentModel>>(
        `/employee/assignment/newest`
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { getAssignmentList, getDetail, getNewest };
