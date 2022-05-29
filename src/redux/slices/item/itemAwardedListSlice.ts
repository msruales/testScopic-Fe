import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import itemService from "../../../services/item.service";
import {ItemFilter} from "../../../models/itemsFilter.model";
import {itemAdapter} from "../../../adapters/item.adapter";
import {Item} from "../../../models/item.model";
import {RootState} from "../../store";

export const fetchAwardedItems = createAsyncThunk("itemsAwardedList/fetchAll", async () => {
    const {data} = await itemService.getAwardedItems();
    return data.map((item: any) => itemAdapter(item))
});

type InitialValue = {
    isLoading: boolean,
    AwardedItems: Item[],
    filter: ItemFilter
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
    AwardedItems: [],
    filter: {
        name: '',
        description: ''
    }
}

const itemAwardedListSlice = createSlice({
    name: 'item',
    initialState: INITIAL_ITEM,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAwardedItems.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchAwardedItems.fulfilled, (state, action:PayloadAction<Item[]>) => {
            state.isLoading = false
            state.AwardedItems = action.payload
        })
        builder.addCase(fetchAwardedItems.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {} = itemAwardedListSlice.actions

export default itemAwardedListSlice.reducer

export const selectFilterAwardedItems = (state: RootState) => state.items.itemsList.filter
export const selectAwardedItems = (state: RootState) => state.items.itemAwardedList.AwardedItems
export const selectLoadingAwardedItems = (state: RootState) => state.items.itemsList.isLoading