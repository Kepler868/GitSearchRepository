import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REPOSITORY_QUERY} from "../api/queries";
import { GITHUB_API, token } from '../../../../token';


export const getCurrentRepository = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("post/repository", async ({ name, owner }, thunkAPI) => {
  try {
    const response = await axios.post(
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
