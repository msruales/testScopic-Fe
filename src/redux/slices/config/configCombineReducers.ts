import {combineReducers} from "@reduxjs/toolkit";
import configCreateSlice from "./configCreateSlice";
import configShowSlice from "./configShowSlice";

export default combineReducers({
    create: configCreateSlice,
    show: configShowSlice,
})