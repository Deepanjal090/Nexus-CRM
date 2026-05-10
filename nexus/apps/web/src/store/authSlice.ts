import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  accessToken: string | null;
  workspaceSlug: string | null;
}

const STORAGE_KEY = 'nexus_auth';

function loadState(): AuthState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return { isAuthenticated: false, user: null, accessToken: null, workspaceSlug: null };
}

function saveState(state: AuthState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: any; accessToken: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      saveState({ ...state });
    },
    setWorkspace(state, action: PayloadAction<string>) {
      state.workspaceSlug = action.payload;
      saveState({ ...state });
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.workspaceSlug = null;
      clearState();
    },
  },
});

export const { setCredentials, setWorkspace, logout } = authSlice.actions;
export default authSlice.reducer;
