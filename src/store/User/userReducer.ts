import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    thunkLoginUser,
    thunkLoginUserByGoogleOrFacebook,
    thunkSignupByGoogleOrFacebook,
    thunkSignupUser
} from './actions';
import { UserState } from '../../types/main';

const initialState: UserState = {
    email: '',
    fullName: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => ({
            ...state,
            ...action.payload
        })
    },
    extraReducers: (builder) => {
        builder.addCase(thunkLoginUser.fulfilled, (state, { payload }) => ({
            ...state,
            email: payload!.email!,
            fullName: payload!.fullName!
        }));
        builder.addCase(thunkLoginUser.rejected, (state, { payload }) => {
            throw new Error(payload!.toString());
        });
        builder.addCase(thunkSignupUser.rejected, (state, { payload }) => {
            throw new Error(payload!.toString());
        });
        builder.addCase(thunkLoginUserByGoogleOrFacebook.fulfilled, (state, { payload }) => ({
            ...state,
            email: payload!.email!,
            fullName: payload!.fullName!
        }));
        builder.addCase(thunkLoginUserByGoogleOrFacebook.rejected, (state, { payload }) => {
            throw new Error(payload!.toString());
        });
        builder.addCase(thunkSignupByGoogleOrFacebook.rejected, (state, { payload }) => {
            throw new Error(payload!.toString());
        });
    }
});

export default userSlice.reducer;
