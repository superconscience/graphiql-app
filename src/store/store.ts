import { combineReducers, configureStore } from '@reduxjs/toolkit';
import editorReducer from './slices/editor';
import authReducer from './slices/auth';

const rootReducer = combineReducers({
  editor: editorReducer,
  auth: authReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
