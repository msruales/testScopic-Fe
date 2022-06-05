import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import itemService from "../../../services/item.service";
import {RootState} from "../../store";
import {ItemAwarded} from "../../../models/itemAwarded.model";
import {itemAwardedAdapter} from "../../../adapters/itemAwarded.adapter";


export const getItemAwardedById = createAsyncThunk("itemAwardedShow/showById", async (id: number) => {
    const {data} = await itemService.showAwardedById(id);
    const item = itemAwardedAdapter(data)
    return {item}
});

type InitialValue = {
    isLoading: boolean,
    currentItem: ItemAwarded,
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
    currentItem: {} as ItemAwarded,
}

const itemAwardedShowSlice = createSlice({
    name: 'itemAwardedShow',
    initialState: INITIAL_ITEM,
    reducers: {
        setItemShowInitialValue: (state) => {
            return INITIAL_ITEM
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getItemAwardedById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getItemAwardedById.fulfilled, (state, action) => {
            state.isLoading = false
            state.currentItem = action.payload.item
        })
        builder.addCase(getItemAwardedById.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default itemAwardedShowSlice.reducer

export const selectCurrentItemAwarded = (state: RootState) => state.items.itemAwardedShow.currentItem
export const selectCurrentItemAwardedLoading = (state: RootState) => state.items.itemAwardedShow.isLoading