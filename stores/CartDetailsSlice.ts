import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./Store";
import CartDetailsModel from "@/models/CartDetailsModel";
import {
  createCartDetails,
  deleteCartDetails,
  editQuantityCartDetails,
  getCartDetailsList,
} from "@/services/CartDetailsService";
import APIResponseModel from "@/models/APIResponseModel";
import CodeHelper from "@/helpers/CodeHelper";

export interface CartDetailsState {
  list: CartDetailsModel[];
  total: number;
  Allchecked: boolean;
  isRemove: boolean;
}

const initialState: CartDetailsState = {
  list: [],
  total: 0,
  Allchecked: false,
  isRemove: false,
};

export const CartDetailsSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {
    setCartDetailsList(state, action: PayloadAction<CartDetailsModel[]>) {
      state.list = action.payload;
      state.total = setTotal(state.list);
    },
    addCartDetailsIntoList(state, action: PayloadAction<CartDetailsModel>) {
      const index = state.list.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index === -1) {
        state.list.unshift(action.payload);
      } else {
        state.list[index].quantity = action.payload.quantity;
      }
    },
    setChecked(state, action: PayloadAction<number>) {
      state.list[action.payload].checked = !state.list[action.payload].checked;
      state.total = setTotal(state.list);
    },
    setAllChecked(state, action: PayloadAction<boolean>) {
      state.list.forEach((item) => (item.checked = action.payload));
      state.Allchecked = action.payload;
      state.total = setTotal(state.list);
    },
    setQuantity(
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) {
      const index = state.list.findIndex(
        (item) => item._id === action.payload._id
      );
      state.list[index].quantity = action.payload.quantity;
      state.total = setTotal(state.list);
    },
    setIsRemove(state, action: PayloadAction<boolean>) {
      state.isRemove = action.payload;
    },
    removeSelectedItems(state, action: PayloadAction<string[]>) {
      state.list = state.list.filter(
        (item) => !action.payload.includes(item._id!)
      );
      state.total = setTotal(state.list);
      state.isRemove = false;
    },
  },
});

const setTotal = (data: CartDetailsModel[]): number => {
  let total: number = data.reduce((total, item) => {
    if (item.checked) {
      return total + item.quantity! * item.product!.price!;
    }
    return total;
  }, 0);
  return total;
};

export const getCartDetailsListAsync = (): AppThunk => async (dispatch) => {
  try {
    let result: APIResponseModel<CartDetailsModel[]> =
      await getCartDetailsList();
    if (result.code == CodeHelper.SUCCESS && result.data) {
      dispatch(setCartDetailsList(result.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const createCartDetailsAsync =
  (product: string): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<CartDetailsModel> = await createCartDetails({
        product,
      });
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(addCartDetailsIntoList(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const editQuantityCartDetailsAsync =
  (cartDetailsId: string, quantity: number): AppThunk =>
  async (dispatch) => {
    try {
      let result: APIResponseModel<CartDetailsModel> =
        await editQuantityCartDetails(cartDetailsId, quantity);
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(
          setQuantity({
            _id: result.data._id!,
            quantity: result.data.quantity!,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteCartDetailAsync =
  (): AppThunk => async (dispatch, getters) => {
    try {
      let fillterList: { _id: string }[] = getters()
        .cart.list.filter((item) => item.checked)
        .map((item) => ({ _id: item._id! }));
      let result: APIResponseModel<{ _id: string }[]> = await deleteCartDetails(
        {
          data: fillterList,
        }
      );
      if (result.code == CodeHelper.SUCCESS && result.data) {
        dispatch(
          removeSelectedItems(
            result.data.map((item: { _id: string }) => item._id)
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

export const {
  setCartDetailsList,
  addCartDetailsIntoList,
  setChecked,
  setAllChecked,
  setQuantity,
  removeSelectedItems,
} = CartDetailsSlice.actions;

export default CartDetailsSlice.reducer;
