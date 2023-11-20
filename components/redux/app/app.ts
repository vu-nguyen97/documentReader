import {createSlice} from '@reduxjs/toolkit';

interface RecentFile {
  filePermission: boolean;
}

const initialData: RecentFile = {
  filePermission: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initialData,
  reducers: {
    updateFilePermission: (state, {payload}) => {
      state.filePermission = payload;
    },
  },
});

export const {updateFilePermission} = appSlice.actions;

export default appSlice.reducer;
