export const AUTHORIZED_QUERY = `query ExampleQuery( $after: String) {
  viewer {
    repositories(first: 10, after: $after) {
      totalCount
      nodes {
        name
        stargazerCount
        updatedAt
        url
        description
        owner {
          login
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
}
`;

export const query = AUTHORIZED_QUERY ;
