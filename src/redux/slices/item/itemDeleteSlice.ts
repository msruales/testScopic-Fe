import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import itemService from "../../../services/item.service";
import {RootState} from "../../store";
import {deleteItem} from "./itemListSlice";

export const deleteItemById = createAsyncThunk("item/deleteById", async (id: number, thunkAPI) => {
    const {data} = await itemService.delete(id);
    const itemId = data.id
    thunkAPI.dispatch(deleteItem(itemId))
    return {itemId}
});

type InitialValue = {
    isLoading: boolean,
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
}

const itemDeleteSlice = createSlice({
    name: 'itemDelete',
    initialState: INITIAL_ITEM,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteItemById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteItemById.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(deleteItemById.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default itemDeleteSlice.reducer
export const selectItems = (state: RootState) => state.items.itemDelete.isLoading