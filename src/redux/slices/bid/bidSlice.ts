import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import bidService from "../../../services/bid.service";
import {bidFullDataAdapter} from "../../../adapters/bidFullDataAdapter";

export const getAllBidsByUser = createAsyncThunk("bids/getAll", async ( _ ) => {
    const {data} = await bidService.getAllBidsForUser();
    return Object.values(data).map( (bid: any) => bidFullDataAdapter(bid))
});

type InitialValue = {
    isLoading: boolean,
    bids: any[]
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
    bids: []
}

const bidSlice = createSlice({
    name: 'bid',
    initialState: INITIAL_ITEM,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBidsByUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getAllBidsByUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.bids = action.payload
        })
        builder.addCase(getAllBidsByUser.rejected, (state) => {
            state.isLoading = false
        })
    }
})
export default bidSlice.reducer

export const selectAllBids = (state: RootState) => state.bids.bids
export const selectAllBidsLoading = (state: RootState) => state.bids.isLoading