import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import filesSlice from './files/files';
import appSlice from './app/app';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 200,
};

const appReducer = combineReducers({
  files: filesSlice,
  app: appSlice,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// Ref: https://redux-toolkit.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Ref: https://stackoverflow.com/questions/67453258/why-do-i-need-to-do-export-const-useappdispatch-usedispatchappdispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
