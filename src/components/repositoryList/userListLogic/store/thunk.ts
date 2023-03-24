import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { query } from '../api/queries';
import { GITHUB_API, token } from '../../../../token';
import { UserListRequestArgs, UserResponse } from '../interfaces/interfaces';

export const getUserRepos = createAsyncThunk <UserResponse, UserListRequestArgs, { rejectValue: string }>(
  "post/userRepos",
    async ({after}, thunkAPI) => {
    try {
      const response = await axios.post<UserResponse>(
        GITHUB_API,
        {
          query,
          variables: {
              after,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
