import OrderModel from "@/models/OrderModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import {
  createOrder,
  editOrderStatus,
  getOrder,
  getStatusOrderList,
} from "@/services/OrderService";
import APIResponseModel from "@/models/APIResponseModel";
import CodeHelper from "@/helpers/CodeHelper";
import QueryModel from "@/models/QueryModel";
import PagenationResponseModel from "@/models/PagenationResponseModel";
import PagenationModel from "@/models/PagenationModel";
import PagenationHelper from "@/helpers/PagenationHelper";

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
  list: OrderModel[];
  status: number;
  pagination: PagenationModel;
}

const initialState: OrderState = {
  newOrder: {
    totalAmount: 0,
    shipping: 0,
    status: 0,
    address1: "",
    address2: "",
    latitude: 0,
    longitude: 0,
    orderDetails: [],
    fullName: "",
    phoneNumber: "",
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
  list: [],
  status: 0,
  pagination: {
    currentPageNumber: PagenationHelper.CURRENT_PAGE_NUMBER,
    offset: PagenationHelper.OFFSET,
    sortField: PagenationHelper.SORT_FIELD,
    sortOrder: PagenationHelper.SORT_ORDER,
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
    setOrderList: (state, action: PayloadAction<OrderModel[]>) => {
      state.list = action.payload;
    },
    setStatus: (state, action: PayloadAction<number>) => {
      state.list = [];
      state.pagination.currentPageNumber = 0;
      state.status = action.payload;
    },
    setPagination: (state, action: PayloadAction<PagenationModel>) => {
      state.pagination = action.payload;
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
  setPagination,
  setOrderList,
  setStatus,
} = OrderSlice.actions;

export const createOrderAsync =
  (order: OrderModel): AppThunk =>
  async (dispatch, getters) => {
    try {
      let result: APIResponseModel<OrderModel> = await createOrder(order);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setOrder(result.data));
        dispatch(
          setNewOrder({
            totalAmount: 0,
            shipping: 0,
            status: 0,
            address1: getters().order.newOrder.address1,
            address2: getters().order.newOrder.address2,
            latitude: getters().order.newOrder.latitude,
            longitude: getters().order.newOrder.longitude,
            orderDetails: [],
            fullName: getters().order.newOrder.fullName,
            phoneNumber: getters().order.newOrder.phoneNumber,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

export const editOrderStatusAsync =
  (orderId: string, status: number): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<OrderModel> = await editOrderStatus(
        orderId,
        status
      );
      if (result.code == CodeHelper.SUCCESS && result.data) {
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getOrderAsync =
  (orderId: string): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<OrderModel> = await getOrder(orderId);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setOrder(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getStatusOrderListAsync =
  (params: QueryModel, status: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      let result: APIResponseModel<PagenationResponseModel<OrderModel[]>> =
        await getStatusOrderList(params, status);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setOrderList(result.data.content));
        const { pagination } = getState().order;
        const updatedPagination: PagenationModel = {
          ...pagination,
          currentPageNumber: result.data.page,
          isLastPage: result.data.isLastPage,
          totalPageNumber: result.data.totalPages,
        };
        dispatch(setPagination(updatedPagination));
      }
    } catch (error) {
      console.log(error);
    }
  };

export default OrderSlice.reducer;
