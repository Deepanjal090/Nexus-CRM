import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  activeModule: string;
}

const initialState: UIState = {
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  activeModule: 'dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    toggleCommandPalette(state) {
      state.commandPaletteOpen = !state.commandPaletteOpen;
    },
    setActiveModule(state, action: PayloadAction<string>) {
      state.activeModule = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, toggleCommandPalette, setActiveModule } = uiSlice.actions;
export default uiSlice.reducer;
