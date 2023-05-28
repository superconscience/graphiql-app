import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface EditorState {
  url: string;
}

const initialState: EditorState = {
  url: 'https://rickandmortyapi.com/graphql',
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setUrl } = editorSlice.actions;

export const selectUrl = (state: RootState) => state.editor.url;

export default editorSlice.reducer;
