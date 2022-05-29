import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice, {Init} from "./slices/authSlice";
import testCombine from "./slices/item/itemCombineReducers";
import bidSlice from "./slices/bid/bidSlice";
import automaticOfferCombineReducers from "./slices/automaticOffer/automaticOfferCombineReducers";
import configCombineReducers from "./slices/config/configCombineReducers";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    items: testCombine,
    auctions: authSlice,
    bids: bidSlice,
    automaticOffer: automaticOfferCombineReducers,
    config: configCombineReducers
  },
});

store.dispatch(Init())

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
