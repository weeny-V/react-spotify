import { combineReducers } from 'redux';
import userSlice from './User/userReducer';
import mainSlice from './Main/mainReducer';

export const rootReducer = combineReducers({
    user: userSlice,
    main: mainSlice
});
