import AccountModel from "@/models/AccountModel";
import APIResponseModel from "@/models/APIResponseModel";
import APIClient from "./APIClient";
import { getUsername } from "@/helpers/DecodeHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const editStatusAccount = (
  status: number
): Promise<APIResponseModel<AccountModel>> => {
  return new Promise(async (resolve, reject) => {
    let token = await AsyncStorage.getItem("token");
    let username = getUsername(token!);
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

const editAccount = (
  accountId: string,
  infor: { fullName: string; phoneNumber: string }
): Promise<APIResponseModel<AccountModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await APIClient.put(
        `/customer/account/${accountId}/edit`,
        infor
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { editStatusAccount, getAccount, editAccount };
