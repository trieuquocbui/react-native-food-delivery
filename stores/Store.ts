import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import LoginReducer from "./LoginSlice";
import RegisterReducer from "./RegisterSlice";
import CategoryReducer from "./CategorySlice";
import ProductReducer from "./ProductSlice";
import CartDetails from "./CartDetailsSlice";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    register: RegisterReducer,
    product: ProductReducer,
    category: CategoryReducer,
    cart: CartDetails
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
