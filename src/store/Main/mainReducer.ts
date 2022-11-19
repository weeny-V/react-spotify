import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setLoadingOff, setLoadingOn } from './actions';
import { MainState } from '../../types/main';

const initialState = {
  loading: false
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(setLoadingOn, (state) => ({
      ...state,
      loading: true,
    }))
    builder.addCase(setLoadingOff, (state) => ({
      ...state,
      loading: false,
    }))
  }
})

export default mainSlice.reducer;
