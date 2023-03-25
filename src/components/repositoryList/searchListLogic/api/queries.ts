export const SEARCH_QUERY = `query Search($query: String!, $after: String) {
  search(query: $query, type: REPOSITORY, first: 10, after: $after) {
    nodes {
      ... on Repository {
        name
        stargazerCount
        updatedAt
        url
        description
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
`;