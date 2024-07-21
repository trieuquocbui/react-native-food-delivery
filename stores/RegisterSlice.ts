import RegisterModel from "@/models/RegisterModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginSlice } from "./LoginSlice";
import { AppThunk } from "./Store";
import APIResponseModel from "@/models/APIResponseModel";
import CodeHelper from "@/helpers/CodeHelper";
import { register } from "@/services/AuthService";
import AccountModel from "@/models/AccountModel";

export interface RegisterState {
  register: RegisterModel;
  error: RegisterModel;
}

const initialState: RegisterState = {
  register: {
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
  },
  error: {
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
  },
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.register.username = action.payload;
      state.error.username = "";
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.register.password = action.payload;
      state.error.password = "";
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.register.confirmPassword = action.payload;
      state.error.confirmPassword = "";
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.register.phoneNumber = action.payload;
      state.error.phoneNumber = "";
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.register.fullName = action.payload;
      state.error.fullName = "";
    },
    setError: (state, action: PayloadAction<RegisterModel>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setConfirmPassword,
  setPhoneNumber,
  setFullName,
  setError,
} = registerSlice.actions;

export const registerAsync =
  (data: RegisterModel): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<AccountModel> = await register(data);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        console.log(result);
      }
    } catch (error: any) {
      const errors: RegisterModel = {
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phoneNumber: "",
      };
      if (error.code == CodeHelper.ENTIRY_EXIST) {
        errors.username = error.message;
      } else if ((error.code = CodeHelper.PHONENUMBER_EXIST)) {
        errors.phoneNumber = error.message;
      }
      dispatch(setError(errors));
    }
  };

export default registerSlice.reducer;
