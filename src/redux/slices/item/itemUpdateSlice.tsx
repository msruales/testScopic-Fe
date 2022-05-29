import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import itemService from "../../../services/item.service";
import {RootState} from "../../store";
import {fetchItems} from "./itemListSlice";
import {Item} from "../../../models/item.model";

interface UpdateRequest {
    item: Item,
    id: number
}

export const updateItemById = createAsyncThunk("item/updateById", async ({item, id}: UpdateRequest, thunkAPI) => {

    const {data} = await itemService.update(item, id);

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

const itemUpdateSlice = createSlice({
    name: 'itemUpdate',
    initialState: INITIAL_ITEM,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateItemById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateItemById.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(updateItemById.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {} = itemUpdateSlice.actions
export default itemUpdateSlice.reducer

export const isLoadingUpdate = (state: RootState) => state.items.itemUpdate.isLoading