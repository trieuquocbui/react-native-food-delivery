import OrderModel from "@/models/OrderModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import { createOrder } from "@/services/OrderService";
import APIResponseModel from "@/models/APIResponseModel";
import CodeHelper from "@/helpers/CodeHelper";

export class ErrorModel {
  fullName!: string;
  phoneNumber!: string;
  address1!: string;
  address2!: string;
}

export interface OrderState {
  newOrder: OrderModel;
  order: OrderModel;
  error: ErrorModel;
  checkInforUser: boolean;
}

const initialState: OrderState = {
  newOrder: {
    totalAmount: 0,
    shipping: 0,
    status: 0,
    address1: "a",
    address2: "b",
    latitude: 0,
    longitude: 0,
    orderDetails: [],
    fullName: "a",
    phoneNumber: "a",
  },
  error: {
    fullName: "",
    phoneNumber: "",
    address1: "",
    address2: "",
  },
  checkInforUser: false,
  order: {
    fullName: "",
    phoneNumber: "",
    totalAmount: 0,
    shipping: 0,
    status: 0,
    address1: "",
    address2: "",
    latitude: 0,
    longitude: 0,
    orderDetails: [],
  },
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setNewOrder: (state, action: PayloadAction<OrderModel>) => {
      state.newOrder = action.payload;
    },
    setOrder: (state, action: PayloadAction<OrderModel>) => {
      state.order = action.payload;
      console.log(state.order);
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.newOrder.phoneNumber = action.payload;
      state.error.phoneNumber = "";
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.newOrder.fullName = action.payload;
      state.error.fullName = "";
    },
    setAddress1: (state, action: PayloadAction<string>) => {
      state.newOrder.address1 = action.payload;
      state.error.address1 = "";
    },
    setAddress2: (state, action: PayloadAction<string>) => {
      state.newOrder.address2 = action.payload;
      state.error.address2 = "";
    },
    setLatitude: (state, action: PayloadAction<number>) => {
      state.newOrder.latitude = action.payload;
    },
    setLongitude: (state, action: PayloadAction<number>) => {
      state.newOrder.longitude = action.payload;
    },
    setError: (state, action: PayloadAction<ErrorModel>) => {
      state.error = action.payload;
    },
    setCheckInforUser: (state, action: PayloadAction<boolean>) => {
      state.checkInforUser = action.payload;
    },
  },
});

export const {
  setOrder,
  setPhoneNumber,
  setFullName,
  setAddress1,
  setAddress2,
  setLatitude,
  setLongitude,
  setError,
  setCheckInforUser,
  setNewOrder,
} = OrderSlice.actions;

export const createOrderAsync =
  (order: OrderModel): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<OrderModel> = await createOrder(order);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setOrder(result.data));
        dispatch(
          setNewOrder({
            totalAmount: 0,
            shipping: 0,
            status: 0,
            address1: "a",
            address2: "b",
            latitude: 0,
            longitude: 0,
            orderDetails: [],
            fullName: "a",
            phoneNumber: "a",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

export default OrderSlice.reducer;
