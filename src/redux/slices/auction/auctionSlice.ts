import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import auctionService from "../../../services/auction.service";
import {getItemById} from "../item/itemShowSlice";

export const auctionCreate = createAsyncThunk("auction/doStore", async ( bid:number ,thunkAPI) => {
    // @ts-ignore
    const currentItemId = thunkAPI.getState().items.itemShow.currentItem.item.id
    const {data} = await auctionService.store({bid, itemId: currentItemId});
    thunkAPI.dispatch(getItemById(currentItemId))
    return {data}
});

type InitialValue = {
    isLoading: boolean,
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
}

const auctionSlice = createSlice({
    name: 'auction',
    initialState: INITIAL_ITEM,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(auctionCreate.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(auctionCreate.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(auctionCreate.rejected, (state) => {
            state.isLoading = false
        })
    }
})
export default auctionSlice.reducer

export const selectCreateAuctionLoading = (state: RootState) => state.auctions.isLoading