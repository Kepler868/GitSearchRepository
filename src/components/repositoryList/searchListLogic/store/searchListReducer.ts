import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchReposList } from "../interfaces/interfaces";
import { getSearchRepos } from "./thunk";

const searchReposState: ISearchReposList = {
  searchRepos: {},
  cachedPages: [],
  isLoading: true,
  currentSearchRequest: "",
  currentPaginationRequest: "",
  currentPage: 0,
};

const searchSlice = createSlice({
  name: "searchList",
  initialState: searchReposState,
  reducers: {
    setCurrentSearchRequest: (
      state: ISearchReposList,
      action: PayloadAction<string>
    ): void => {
      state.currentSearchRequest = action.payload;
    },
    setCurrentPaginationRequest: (
      state: ISearchReposList,
      action: PayloadAction<string>
    ): void => {
      state.currentPaginationRequest = action.payload;
    },
    incrementCurrentPage: (state: ISearchReposList): void => {
      state.currentPage++;
    },
    decrementCurrentPage: (state: ISearchReposList): void => {
      state.currentPage--;
    },
    setNewRequest: (state: ISearchReposList): void => {
      state.cachedPages = [];
      state.currentPage = 0;
    },
  },
  extraReducers: (builder) => {
    const { pending, fulfilled, rejected } = getSearchRepos;

    builder
      .addCase(pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchRepos = action.payload;
        if (
          state.searchRepos.data?.search &&
          (state.cachedPages.length === 0 ||
            state.currentPaginationRequest !== state.currentSearchRequest)
        ) {
          state.cachedPages = [state.searchRepos.data?.search];
        } else if (
          state.searchRepos.data?.search &&
          state.currentPaginationRequest === state.currentSearchRequest
        ) {
          state.cachedPages = [...state.cachedPages, state.searchRepos.data?.search];
        }
      })
      .addCase(rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer: searchListReducer, actions: searchListActions } = searchSlice;
