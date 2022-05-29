import {combineReducers} from "@reduxjs/toolkit";
import automaticOfferCreateSlice from "./automaticOfferCreateSlice";
import automaticOfferShowSlice from "./automaticOfferShowSlice";

export default combineReducers({
    create: automaticOfferCreateSlice,
    show: automaticOfferShowSlice,
})