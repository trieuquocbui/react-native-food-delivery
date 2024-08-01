import AccountModel from "@/models/AccountModel";
import APIResponseModel from "@/models/APIResponseModel";
import APIClient from "./APIClient";

const editStatusAccount = (
  status: number
): Promise<APIResponseModel<AccountModel>> => {
  return new Promise(async (resolve, reject) => {
    let username = getUsername();
    try {
      const result = await APIClient.put(
        `/public/account/${username}/edit/status`,
        {
          status: status,
        }
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getAccount = (
  accountId: string
): Promise<APIResponseModel<AccountModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await APIClient.get(`/public/account/${accountId}`);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { editStatusAccount, getAccount };
function getUsername() {
  throw new Error("Function not implemented.");
}
