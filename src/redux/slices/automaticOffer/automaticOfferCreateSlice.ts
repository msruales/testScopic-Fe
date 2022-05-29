import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import automaticOfferService from "../../../services/automaticOffer.service";
import {setAutomaticOffer} from "./automaticOfferShowSlice";

export const setAutomaticOffers = createAsyncThunk("automaticOffer/setConfig", async ( itemId: number ,thunkAPI) => {
    const {data} = await automaticOfferService.setAutomaticOffers(itemId);
    thunkAPI.dispatch(setAutomaticOffer(data.isActive))
    return data
});

type InitialValue = {
    isLoading: boolean,
}

const INITIAL_VALUES: InitialValue = {
    isLoading: false,
}

const automaticOfferCreateSlice = createSlice({
    name: 'automaticOfferCreate',
    initialState: INITIAL_VALUES,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setAutomaticOffers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(setAutomaticOffers.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(setAutomaticOffers.rejected, (state) => {
            state.isLoading = false
        })
    }
})
export default automaticOfferCreateSlice.reducer

export const selectAutomaticOfferCreateLoading = (state: RootState) => state.automaticOffer.create.isLoading