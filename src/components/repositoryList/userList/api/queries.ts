import { API_TOKEN } from '../../../../token';




export const UNAUTHORIZED_QUERY = `query User ($after: String) {
  viewer:user(login: "kepler868") {
    repositories(first: 10, after: $after) {
        totalCount
      nodes {
        name
        stargazerCount
        updatedAt
        url
        owner {
          login
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}
`;

export const  AUTHORIZED_QUERY = `query ExampleQuery( $after: String) {
  viewer {
    repositories(first: 10, after: $after) {
      totalCount
      nodes {
        name
        stargazerCount
        updatedAt
        url
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
`

export const query = API_TOKEN ? AUTHORIZED_QUERY : UNAUTHORIZED_QUERY;