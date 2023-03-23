import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";

import { getCurrentRepository } from "./thunk";

const repositoryState: any = {
  repositoryData: {},
  cachedRepository: [],
  activeModal: false,
  isLoading: true,
};

const repositorySlice = createSlice({
  name: "repositoryItem",
  initialState: repositoryState,
  reducers: {
    setModalActive: (state: any, action: PayloadAction<boolean>): void => {
      state.activeModal = action.payload
    },
    
  },
  extraReducers: (builder) => {
    const { pending, fulfilled, rejected } = getCurrentRepository;

    builder
      .addCase(pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fulfilled, (state, action) => {
        state.isLoading = false;
        state.repositoryData = action.payload;
      })
      .addCase(rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer: repositoryReducer, actions: repositoryActions } = repositorySlice;
