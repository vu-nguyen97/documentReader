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
  stars: File[];
}

const initialData: RecentFile = {
  maxRecentFiles: 20,
  recent: [],
  stars: [],
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
    updateStar: (state, {payload}) => {
      if (!payload?.path) return;
      const activedPath = payload.path;
      const isExist = state.stars.some(el => el.path === activedPath);

      if (isExist) {
        state.stars = state.stars.filter(el => el.path !== activedPath);
      } else {
        delete payload.star;
        state.stars.push(payload);
      }
    },
  },
});

export const {updateRecentFiles, updateStar} = filesSlice.actions;

export default filesSlice.reducer;
