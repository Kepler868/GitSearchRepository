import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GITHUB_API, token } from "../../../../token";
import { SEARCH_QUERY } from "../api/queries";
import { SearchResponse } from "../interfaces/interfaces";
export interface SearchRequest {
  query: string;
  after?: string;
}
export const getSearchRepos = createAsyncThunk<
  SearchResponse,
  SearchRequest,
  { rejectValue: string }
>("post/searchRepos", async ({ query, after = null }, thunkAPI) => {
  try {
    const response = await axios.post<SearchResponse>(
      GITHUB_API,
      {
        query: SEARCH_QUERY,
        variables: {
          query,
          after,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});
