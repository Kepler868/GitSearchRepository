export const REPOSITORY_QUERY = `query Query($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    name
    stargazerCount
    updatedAt
    description
    owner {
      avatarUrl
      login
      url
    }
    languages(first: 5) {
      nodes {
        name
        color
      }
    }
    
  }
}`;
