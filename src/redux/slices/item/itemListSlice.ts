import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import itemService from "../../../services/item.service";
import {ItemFilter} from "../../../models/itemsFilter.model";
import {itemAdapter} from "../../../adapters/item.adapter";
import {Item} from "../../../models/item.model";
import {RootState} from "../../store";

export const fetchItems = createAsyncThunk("item/fetchAll", async (_, thunkAPI) => {
    // @ts-ignore
    const currentFilter = thunkAPI.getState().items.itemsList.filter
    // @ts-ignore
    const currentSort = thunkAPI.getState().items.itemsList.sort
    const {data} = await itemService.getAll(currentFilter, currentSort );
    const items = data.map((item: any) => itemAdapter(item))
    return {items}
});

type InitialValue = {
    isLoading: boolean,
    sort: 'asc' | 'desc'
    items: Item[],
    filter: ItemFilter
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
    items: [],
    sort: 'asc',
    filter: {
        name: '',
        description: ''
    }
}

const itemListSlice = createSlice({
    name: 'item',
    initialState: INITIAL_ITEM,
    reducers: {
        setSort: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.sort = action.payload
        },
        setFilterItem: (state, action: PayloadAction<ItemFilter>) => {
            state.filter = action.payload
        },
        setClearFilterItem: (state) => {
            state.filter = INITIAL_ITEM.filter
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item: Item) => item.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.items = action.payload.items
        })
        builder.addCase(fetchItems.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {deleteItem, setFilterItem, setClearFilterItem, setSort} = itemListSlice.actions

export default itemListSlice.reducer

export const selectCurrentFilter = (state: RootState) => state.items.itemsList.filter
export const selectItems = (state: RootState) => state.items.itemsList.items
export const selectItemsLoading = (state: RootState) => state.items.itemsList.isLoading