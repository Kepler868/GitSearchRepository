export interface ISearchReposList {
  searchRepos: SearchResponse;
  cachedPages: SearchRepos[];
  isLoading: boolean;
  currentSearchRequest: string;
  currentPaginationRequest: string;
  currentPage: number;
}

export interface SearchResponse {
  data?: SearchData;
}

export interface SearchData {
  search: SearchRepos;
}

export interface SearchRepos {
  nodes: SearchNode[];
  pageInfo: PageInfo;
  repositoryCount: Number;
}

export interface SearchNode {
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  description: string;
  owner: SearchOwner;
}

export interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SearchOwner {
  login: string;
}
