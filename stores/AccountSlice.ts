import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import APIResponseModel from "@/models/APIResponseModel";
import CodeHelper from "@/helpers/CodeHelper";
import AccountModel from "@/models/AccountModel";
import { editStatusAccount, getAccount } from "@/services/AccountService";

export interface AccountState {
  account: AccountModel;
}

const initialState: AccountState = {
  account: {
    username: "",
    password: "",
    conformPassword: "",
    user: {
      phoneNumber: "",
      fullName: "",
    },
  },
};

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount(state, actions: PayloadAction<AccountModel>) {
      state.account = actions.payload;
    },
    setStatus(state, actions: PayloadAction<number>) {
      state.account.status = actions.payload;
    },
  },
});

export const editStatusAccountAsync =
  (status: number): AppThunk =>
  async (dispatch) => {
    console.log(1);
    try {
      let result: APIResponseModel<AccountModel> = await editStatusAccount(
        status
      );
      if (result.code == CodeHelper.SUCCESS && result.data) {
        console.log(result.data);
        dispatch(setAccount(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getAccountAsync =
  (accountId: string): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<AccountModel> = await getAccount(accountId);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setAccount(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const { setAccount, setStatus } = AccountSlice.actions;

export default AccountSlice.reducer;
