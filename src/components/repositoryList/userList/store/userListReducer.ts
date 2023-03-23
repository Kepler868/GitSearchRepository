import { createSlice } from "@reduxjs/toolkit";
import { IUserReposState, Repositories } from "../interfaces/interfaces";
import { getUserRepos } from "./thunk";

const userReposState: IUserReposState = {
  userRepos: {},
  cachedUserPages: [],
  currentPage: 0,
  isLoading: true,
};

const userSlice = createSlice({
  name: "userList",
  initialState: userReposState,
  reducers: {
    incrementCurrentPage: (state: any): void => {
      state.currentPage++;
    },
    decrementCurrentPage: (state: any): void => {
      state.currentPage--;
    },
  },
  extraReducers: (builder) => {
    const { pending, fulfilled, rejected } = getUserRepos;

    builder
      .addCase(pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fulfilled, (state, action) => {
        state.isLoading = false;
          state.userRepos = action.payload;
          if (state.cachedUserPages.length === 0) {
              state.cachedUserPages = [state.userRepos.data?.viewer.repositories];
          } else {
              state.cachedUserPages = [
                ...state.cachedUserPages,
                state.userRepos.data?.viewer.repositories,
              ];
          }
      })
      .addCase(rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer: userListReducer, actions: userListActions } = userSlice;
