import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import configService from "../../../services/config.service";
import {Config} from "../../../models/config.model";
import {configAdapter} from "../../../adapters/config.adapter";
import {setConfig} from "./configShowSlice";

export const setConfigAutomaticOffers = createAsyncThunk("config/setConfig", async ( config: Config, thunkAPI ) => {
    const {data} = await configService.setConfig(config);
    const configAdapted = configAdapter(data.config);
    thunkAPI.dispatch(setConfig({...configAdapted}))
    return data
});

type InitialValue = {
    isLoading: boolean,
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
}

const configCreateSlice = createSlice({
    name: 'config',
    initialState: INITIAL_ITEM,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setConfigAutomaticOffers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(setConfigAutomaticOffers.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(setConfigAutomaticOffers.rejected, (state) => {
            state.isLoading = false
        })
    }
})
export default configCreateSlice.reducer

export const selectConfigAutomaticOffersCreateLoading = (state: RootState) => state.config.create.isLoading