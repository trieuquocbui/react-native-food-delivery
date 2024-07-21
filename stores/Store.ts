import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import loginReducer from './LoginSlice'
import registerReducer from './RegisterSlice'

const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;