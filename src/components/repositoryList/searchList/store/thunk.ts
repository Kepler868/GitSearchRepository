import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export interface SearchRequest {
    query: string;
    after?: string | null;
    before?: string | null;

}
export const getSearchRepos = createAsyncThunk<any, SearchRequest, { rejectValue: string }>(
  "post/searchRepos",
  async ({query, after = null, before = null}, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://api.github.com/graphql`,
        {
          query: `query Search($query: String!, $after: String, $before: String) {
  search(query: $query, type: REPOSITORY, first: 10, after: $after, before: $before) {
    nodes {
      ... on Repository {
        name
        stargazerCount
        updatedAt
        url
        owner {
          login
        }
      }
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    repositoryCount
  }
}
`,
          variables: {
            query,
              after,
            before
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer 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",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
