import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  accessToken: string | null;
  workspaceSlug: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  workspaceSlug: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: any; accessToken: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    setWorkspace(state, action: PayloadAction<string>) {
      state.workspaceSlug = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.workspaceSlug = null;
    },
  },
});

export const { setCredentials, setWorkspace, logout } = authSlice.actions;
export default authSlice.reducer;
