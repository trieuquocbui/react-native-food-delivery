import ProductModel from "@/models/ProductModel";
import QueryModel from "@/models/QueryModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import APIResponseModel from "@/models/APIResponseModel";
import PagenationResponseModel from "@/models/PagenationResponseModel";
import { getDetail, getProductList } from "@/services/ProductService";
import CodeHelper from "@/helpers/CodeHelper";
import PagenationModel from "@/models/PagenationModel";
import PagenationHelper from "@/helpers/PagenationHelper";

export interface ProductState {
  list: ProductModel[];
  pagination: PagenationModel;
  detail: ProductModel;
}

const initialState: ProductState = {
  list: [],
  pagination: {
    currentPageNumber: PagenationHelper.CURRENT_PAGE_NUMBER,
    offset: PagenationHelper.OFFSET,
    sortField: PagenationHelper.SORT_FIELD,
    sortOrder: PagenationHelper.SORT_ORDER,
  },
  detail: {
    _id: "",
    name: "",
    description: "",
    status: false,
    featured: false,
    category: "",
    thumbnail: "",
  },
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<ProductModel[]>) => {
      state.list.push(...action.payload);
    },
    // appendProductList: (state, action: PayloadAction<ProductModel[]>) => {
    //   state.list.push(...action.payload);
    // },
    setPagination: (state, action: PayloadAction<PagenationModel>) => {
      state.pagination = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.pagination.category = action.payload;
      state.list = [];
      state.pagination.currentPageNumber = 0;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.pagination.searchQuery = action.payload;
      state.list = [];
      state.pagination.currentPageNumber = 0;
    },
    setDetails: (state, action: PayloadAction<ProductModel>) => {
      state.detail = action.payload;
    },
  },
});

export const getProductListAsync =
  (params: QueryModel): AppThunk =>
  async (dispatch, getState) => {
    try {
      let result: APIResponseModel<PagenationResponseModel<ProductModel[]>> =
        await getProductList(params);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setProductList(result.data.content));
        const { pagination } = getState().product;
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
  (productId: string): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<ProductModel> = await getDetail(productId);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(setDetails(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const {
  setProductList,
  setPagination,
  setCategory,
  // appendProductList,
  setSearch,
  setDetails,
} = ProductSlice.actions;

export default ProductSlice.reducer;
