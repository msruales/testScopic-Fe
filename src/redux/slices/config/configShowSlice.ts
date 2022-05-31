import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import configService from "../../../services/config.service";
import {Config} from "../../../models/config.model";
import {configAdapter} from "../../../adapters/config.adapter";

export const showConfigAutomaticOffers = createAsyncThunk("config/showConfig", async () => {
    const {data} = await configService.getConfig();
    return configAdapter(data)
});

type InitialValue = {
    isLoading: boolean,
    config: Config
}

const INITIAL_ITEM: InitialValue = {
    isLoading: false,
    config: {} as Config
}

const configCreateSlice = createSlice({
    name: 'config',
    initialState: INITIAL_ITEM,
    reducers: {
        setConfig: (state, action: PayloadAction<Config>) => {
            state.config = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(showConfigAutomaticOffers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(showConfigAutomaticOffers.fulfilled, (state, action: PayloadAction<Config>) => {
            state.isLoading = false
            state.config = action.payload
        })
        builder.addCase(showConfigAutomaticOffers.rejected, (state) => {
            state.isLoading = false
        })
    }
})
export const {setConfig} =configCreateSlice.actions
export default configCreateSlice.reducer

export const selectConfigAutomaticOffers = (state: RootState) => state.config.show.config
export const selectConfigAutomaticOffersLoading = (state: RootState) => state.config.show.isLoading