import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/user.model";
import {RootState} from "../store";
import userService from "../../services/user.service";
import {Login} from "../../models/login.model";
import {AuthToken} from "../../config/auth/authToken";
import {userAdapter} from "../../pages/Login/adapters/user.adapter";
import {Register} from "../../models/register.model";

export const Init = createAsyncThunk("user/init", async () => {
    const {data} = await userService.refreshUser();
    const user = userAdapter(data.user)
    return {user};
});

export const login = createAsyncThunk("user/login", async (values: Login, thunkAPI) => {
    const {data} = await userService.login(values);
    const token = data.token;
    const user = userAdapter(data.user)
    thunkAPI.dispatch(setLogin({token, user}))
    return {token, user};
});

export const register = createAsyncThunk("user/register", async (values: Register, thunkAPI) => {
    const {data} = await userService.register(values);
    const token = data.token;
    const user = userAdapter(data.user)
    thunkAPI.dispatch(setLogin({token, user}))
    return {token, user};
});

type AuthState = {
    isLoadingRegister: boolean,
    isLoadingInit: boolean,
    isLoading: boolean,
    user: User,
    token: string | null
}

const INITIAL_AUTH: AuthState = {
    isLoadingRegister: false,
    isLoadingInit: false,
    isLoading: false,
    user: {} as User,
    token: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_AUTH,
    reducers: {
        setLogin: (state, action: PayloadAction<{ token: string, user: User }>) => {
            AuthToken.set(action.payload.token, true)
            state.isLoading = false
            state.user = action.payload.user
        },
        setLogout: () => {
            AuthToken.set('', false)
            return  {...INITIAL_AUTH}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(login.rejected, (state) => {
            AuthToken.set('', false)
            state.isLoading = false
        })
        builder.addCase(register.pending, (state) => {
            state.isLoadingRegister = true
        })
        builder.addCase(register.fulfilled, (state) => {
            state.isLoadingRegister = false
        })
        builder.addCase(register.rejected, (state) => {
            AuthToken.set('', false)
            state.isLoadingRegister = false
        })
        builder.addCase(Init.pending, (state) => {
            state.isLoadingInit = true
        })
        builder.addCase(Init.fulfilled, (state, action) => {
            state.isLoadingInit = false
            state.user = action.payload.user
        })
        builder.addCase(Init.rejected, (state) => {
            state.isLoadingInit = false
        })
    }
})

export const {setLogout, setLogin} = authSlice.actions

export default authSlice.reducer

export const isLoadingInit = (state: RootState) => state.auth.isLoadingInit
export const isLoginLoading = (state: RootState) => state.auth.isLoading
export const isRegisterLoading = (state: RootState) => state.auth.isLoadingRegister
export const selectCurrentUser = (state: RootState) => state.auth.user
