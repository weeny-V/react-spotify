import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setUser } from './actions';
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
  }
})

export default userSlice.reducer;
