import LoginModel from "@/models/LoginModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import { login } from "@/services/AuthService";
import CodeHelper from "@/helpers/CodeHelper";
import APIResponseModel from "@/models/APIResponseModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountModel from "@/models/AccountModel";
import { setAccount } from "./AccountSlice";

export interface LoginState {
  login: LoginModel;
  error: LoginModel;
}

const initialState: LoginState = {
  login: {
    username: "",
    password: "",
  },
  error: {
    username: "",
    password: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountModel>) => {
      state.login = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.login.username = action.payload;
      state.error.username = "";
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.login.password = action.payload;
      state.error.password = "";
    },
    setError: (state, action: PayloadAction<LoginModel>) => {
      state.error = action.payload;
    },
  },
});

export const { setUsername, setPassword, setError } = loginSlice.actions;

export const loginAsync =
  (data: LoginModel): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<{ account: AccountModel; token: string }> =
        await login(data);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        AsyncStorage.setItem("token", result.data.token);
        dispatch(setAccount(result.data.account));
      }
    } catch (error: any) {
      const errors: LoginModel = {
        username: "",
        password: "",
      };
      if (error.code == CodeHelper.ENTITY_NOT_EXIST) {
        errors.username = error.message;
      } else if ((error.code = CodeHelper.WRONG_PASSWORD)) {
        errors.password = error.message;
      }
      dispatch(setError(errors));
    }
  };

export default loginSlice.reducer;
