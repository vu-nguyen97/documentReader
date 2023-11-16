import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import filesSlice from './files/files';

const appReducer = combineReducers({
  files: filesSlice,
});

const store = configureStore({
  reducer: appReducer,
});

// Ref: https://redux-toolkit.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Ref: https://stackoverflow.com/questions/67453258/why-do-i-need-to-do-export-const-useappdispatch-usedispatchappdispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
