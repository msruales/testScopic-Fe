import {combineReducers} from "@reduxjs/toolkit";
import itemsList from "./itemListSlice";
import itemShowSlice from "./itemShowSlice";
import itemDeleteSlice from "./itemDeleteSlice";
import itemUpdateSlice from "./itemUpdateSlice";
import itemCreateSlice from "./itemCreateSlice";
import itemAwardedListSlice from "./itemAwardedListSlice";
import itemAwardedShow from "./itemAwardedShowSlice";

export default combineReducers({
    itemsList: itemsList,
    itemShow: itemShowSlice,
    itemDelete: itemDeleteSlice,
    itemUpdate: itemUpdateSlice,
    itemCreate: itemCreateSlice,
    itemAwardedList: itemAwardedListSlice,
    itemAwardedShow: itemAwardedShow
})