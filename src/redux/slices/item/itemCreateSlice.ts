import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import itemService from "../../../services/item.service";
import {RootState} from "../../store";
import {fetchItems} from "./itemListSlice";
import {Item} from "../../../models/item.model";

export const createItem = createAsyncThunk("item/createById", async (item: Partial<Item>, thunkAPI) => {
    const {data} = await itemService.store(item);
    const itemId = data.id
    thunkAPI.dispatch(fetchItems())
    return {itemId}
});

type InitialValue = {
    isLoading: boolean,
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
}

const itemCreateSlice = createSlice({
    name: 'itemCreate',
    initialState: INITIAL_ITEM,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createItem.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(createItem.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {} = itemCreateSlice.actions
export default itemCreateSlice.reducer

export const isLoadingUpdate = (state: RootState) => state.items.itemCreate.isLoading