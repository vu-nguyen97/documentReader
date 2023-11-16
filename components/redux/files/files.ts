import {createSlice} from '@reduxjs/toolkit';

export interface File {
  path: string;
  name: string;
  time: string;
  size: string;
  location?: string;
}

interface RecentFile {
  maxRecentFiles: number;
  recent: File[];
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
      if (!payload?.name) return;

      const newList = [...state.recent].filter((file: any) => {
        if (file.path === payload.path) return false;
        return true;
      });
      newList.unshift(payload);

      state.recent =
        newList.length > state.maxRecentFiles ? newList.slice(0, -1) : newList;
    },
  },
});

export const {updateRecentFiles} = filesSlice.actions;

export default filesSlice.reducer;
