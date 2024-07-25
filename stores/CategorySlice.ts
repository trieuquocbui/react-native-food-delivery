import CategoryModel from "@/models/CategoryModel";
import { getAllCategory } from "@/services/CategoryService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import APIResponseModel from "@/models/APIResponseModel";
import CodeHelper from "@/helpers/CodeHelper";

export interface CategoryState {
  list: CategoryModel[];
}

const initialState: CategoryState = {
  list: [],
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryList(state, actions: PayloadAction<CategoryModel[]>) {
      actions.payload[0]._id = "";
      state.list = actions.payload;
    },
  },
});

export const getAllCategoryAsync = (): AppThunk => async (dispatch) => {
  try {
    let result: APIResponseModel<CategoryModel[]> = await getAllCategory();
    if (result.code == CodeHelper.SUCCESS && result.data) {
      dispatch(setCategoryList(result.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const { setCategoryList } = CategorySlice.actions;

export default CategorySlice.reducer;
