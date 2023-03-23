import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { query } from '../api/queries';
import { GITHUB_API, token } from '../../../../token';

export interface userListRequestArgs {
    after?: string;
}

export const getUserRepos = createAsyncThunk<any, userListRequestArgs, { rejectValue: string }>(
  "post/userRepos",
    async ({ after}, thunkAPI) => {
    try {
      const response = await axios.post(
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
