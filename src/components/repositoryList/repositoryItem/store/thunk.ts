import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REPOSITORY_QUERY} from "../api/queries";
import { GITHUB_API, token } from '../../../../token';
import { RepositoryData, RepositoryRequestArgs } from '../interfaces/interfaces';


export const getCurrentRepository = createAsyncThunk<
  RepositoryData,
  RepositoryRequestArgs,
  { rejectValue: string }
>("post/repository", async ({ name, owner }, thunkAPI) => {
  try {
    const response = await axios.post<RepositoryData>(
      GITHUB_API,
      {
        query: REPOSITORY_QUERY,
        variables: {
            name,
            owner
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
});
