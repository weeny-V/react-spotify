import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState } from '../../types/main';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { setLoadingOff, setLoadingOn } from '../Main/actions';

interface User {
  email: string;
  password: string;
}

export const setUser = createAction(
  'user/setUser',
  (user: UserState) => ({ payload: user })
);

export const thunkSetUser = createAsyncThunk(
  'user/setUser',
  async (user: User, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingOn());

      await createUserWithEmailAndPassword(auth, user.email, user.password);

      thunkAPI.dispatch(setLoadingOff());
    } catch (err) {
      console.log(err);
      thunkAPI.dispatch(setLoadingOff());
      throw err;
    }
  }
)

