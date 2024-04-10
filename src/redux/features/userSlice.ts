import { UserType } from "@/types/user.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


type UserInitialState = {
    loading: boolean,
    user?: UserType,
    error: string
}

const userInitialState : UserInitialState = {
    loading: false,
    user: undefined,
    error: '',
}

export const fetchUser = createAsyncThunk('user/fetchUser', async (id: string) => {
    const res = await fetch(`/api/auth/user?uid=${id}`)
    return await res.json()
})

export const userInitSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action : PayloadAction<UserType>) => {
            state.loading = false;
            state.user = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUser.rejected, (state, action ) => {
            state.loading = false;
            state.user = undefined;
            state.error = action.error.message || 'Something went wrong';
        });
    },
    reducers: {}
})

export default userInitSlice.reducer;
