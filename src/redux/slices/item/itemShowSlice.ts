import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import itemService from "../../../services/item.service";
import {RootState} from "../../store";
import {ItemFullDataAdapter} from "../../../adapters/itemFullData.adapter";
import {ItemFullData} from "../../../models/itemFullData.model";


export const getItemById = createAsyncThunk("item/showById", async (id: number) => {
    const {data} = await itemService.showById(id);
    const item = ItemFullDataAdapter(data)
    return {item}
});

type InitialValue = {
    isLoading: boolean,
    currentItem: ItemFullData,
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
    currentItem: {} as ItemFullData,

}

const itemShowSlice = createSlice({
    name: 'itemShow',
    initialState: INITIAL_ITEM,
    reducers: {
        setItemShowInitialValue: (state) => {
            return INITIAL_ITEM
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getItemById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getItemById.fulfilled, (state, action) => {
            state.isLoading = false
            state.currentItem = action.payload.item
        })
        builder.addCase(getItemById.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { setItemShowInitialValue } = itemShowSlice.actions

export default itemShowSlice.reducer

export const selectCurrentItemById = (state: RootState) => state.items.itemShow.currentItem
export const selectCurrentItemByIdLoading = (state: RootState) => state.items.itemShow.isLoading