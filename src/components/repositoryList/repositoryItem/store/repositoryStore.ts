import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepositoryList } from "../interfaces/interfaces";
import { getCurrentRepository } from "./thunk";

const repositoryState: RepositoryList = {
  repositoryData: {},
  activeModal: false,
  isImageLoaded: false,
  isLoading: true,
};

const repositorySlice = createSlice({
  name: "repositoryItem",
  initialState: repositoryState,
  reducers: {
    setModalActive: (state: RepositoryList, action: PayloadAction<boolean>): void => {
      state.activeModal = action.payload;
    },
    setImageLoaded: (state: RepositoryList, action: PayloadAction<boolean>): void => {
      state.isImageLoaded = action.payload;
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
