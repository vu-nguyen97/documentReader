import {createSlice} from '@reduxjs/toolkit';

interface RecentFile {
  maxRecentFiles: number;
  recent: any;
}

const initialData: RecentFile = {
  maxRecentFiles: 20,
  recent: [],
};

export const filesSlice = createSlice({
  name: 'files',
  initialState: initialData,
  reducers: {
    updateRecentFiles: (state, {payload}) => {
      if (!payload) return;

      const newData = {...payload, time: new Date().toLocaleString()};
      const newList = [...state.recent].filter((file: any) => {
        if (file.uri === payload.uri) return false;
        return true;
      });
      newList.unshift(newData);

      state.recent =
        newList.length > state.maxRecentFiles ? newList.slice(0, -1) : newList;
    },
  },
});

export const {updateRecentFiles} = filesSlice.actions;

export default filesSlice.reducer;
