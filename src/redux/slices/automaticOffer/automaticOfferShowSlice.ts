import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import automaticOfferService from "../../../services/automaticOffer.service";

export const showAutomaticOffer = createAsyncThunk("automaticOffer/get", async (itemId:number, thunkAPI) => {
    const {data} = await automaticOfferService.getAutomaticOffers(itemId);
    return Boolean(data.isActive)
});

type InitialValue = {
    isLoading: boolean,
    isActive: boolean

}

const INITIAL_VALUES: InitialValue = {
    isLoading: false,
    isActive: false,
}

const automaticOfferShowSlice = createSlice({
    name: 'automaticOfferGet',
    initialState: INITIAL_VALUES,
    reducers: {
        setAutomaticOffer: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(showAutomaticOffer.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(showAutomaticOffer.fulfilled, (state, action:PayloadAction<boolean>) => {
            state.isLoading = false
            state.isActive = action.payload
        })
        builder.addCase(showAutomaticOffer.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {setAutomaticOffer} = automaticOfferShowSlice.actions

export default automaticOfferShowSlice.reducer

export const selectAutomaticOffer = (state: RootState) => state.automaticOffer.show.isActive
export const selectAutomaticOfferLoading = (state: RootState) => state.automaticOffer.show.isLoading
