import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import APIResponseModel from "@/models/APIResponseModel";
import CodeHelper from "@/helpers/CodeHelper";
import AccountModel from "@/models/AccountModel";
import {
  editAccount,
  editStatusAccount,
  getAccount,
} from "@/services/AccountService";

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
    setFullName(state, actions: PayloadAction<string>) {
      state.account.user.fullName = actions.payload;
    },
    setPhoneNumber(state, actions: PayloadAction<string>) {
      state.account.user.phoneNumber = actions.payload;
    },
  },
});

export const editStatusAccountAsync =
  (status: number): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<AccountModel> = await editStatusAccount(
        status
      );
      if (result.code == CodeHelper.SUCCESS && result.data) {
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

export const editProfile =
  (infor: { fullName: string; phoneNumber: string }): AppThunk =>
  async (dispatch, getters) => {
    try {
      let result: APIResponseModel<AccountModel> = await editAccount(
        getters().account.account._id!,
        infor
      );
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setAccount(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const { setAccount, setStatus, setPhoneNumber, setFullName } =
  AccountSlice.actions;

export default AccountSlice.reducer;
