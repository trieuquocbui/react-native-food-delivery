import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import APIResponseModel from "@/models/APIResponseModel";
import CodeHelper from "@/helpers/CodeHelper";
import AssignmentModel from "@/models/AssignmentModel";
import PagenationModel from "@/models/PagenationModel";
import QueryModel from "@/models/QueryModel";
import PagenationResponseModel from "@/models/PagenationResponseModel";
import {
  getAssignmentList,
  getDetail,
  getNewest,
} from "@/services/AssignmentService";

export interface AssignmentState {
  receiveAssigment: AssignmentModel | null;
  shippingAssigment: AssignmentModel | null;
  assigmentHistory: AssignmentModel;
  list: AssignmentModel[];
  pagination: PagenationModel;
}

const initialState: AssignmentState = {
  receiveAssigment: null,
  shippingAssigment: null,
  list: [],
  pagination: {
    currentPageNumber: 0,
    offset: 0,
    sortField: "",
    sortOrder: "",
  },
  assigmentHistory: {
    _id: "",
    employee: {
      phoneNumber: "",
      fullName: "",
    },
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
  },
};

export const AssignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setReceiveAssigment(state, actions: PayloadAction<AssignmentModel | null>) {
      state.receiveAssigment = actions.payload;
    },
    setShippingAssigment(
      state,
      actions: PayloadAction<AssignmentModel | null>
    ) {
      state.shippingAssigment = actions.payload;
    },
    setAssigmentHistory(state, actions: PayloadAction<AssignmentModel>) {
      state.assigmentHistory = actions.payload;
    },
    setAssigmentList: (state, action: PayloadAction<AssignmentModel[]>) => {
      state.list.push(...action.payload);
    },
    setPagination: (state, action: PayloadAction<PagenationModel>) => {
      state.pagination = action.payload;
    },
  },
});

export const getAssigmentListAsync =
  (params: QueryModel): AppThunk =>
  async (dispatch, getState) => {
    try {
      let result: APIResponseModel<PagenationResponseModel<AssignmentModel[]>> =
        await getAssignmentList(params);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setAssigmentList(result.data.content));
        const { pagination } = getState().assignment;
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

export const getDetailAsync =
  (assignmentId: string): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<AssignmentModel> = await getDetail(
        assignmentId
      );
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setAssigmentHistory(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getNewestAsync = (): AppThunk => async (dispatch) => {
  try {
    let result: APIResponseModel<AssignmentModel> = await getNewest();
    if (result.code == CodeHelper.SUCCESS) {
      dispatch(setReceiveAssigment(result.data!));
    }
  } catch (error) {
    console.log(error);
  }
};

export const {
  setReceiveAssigment,
  setShippingAssigment,
  setPagination,
  setAssigmentList,
  setAssigmentHistory,
} = AssignmentSlice.actions;

export default AssignmentSlice.reducer;
