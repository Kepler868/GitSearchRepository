export interface ISearchReposList {
  searchRepos: SearchRepos;
  cachedPages: any;
  isLoading: boolean;
  currentSearchRequest: string;
    currentPaginationRequest: string;
    currentPage: number;
}

export interface SearchRepos {
  data?: SearchData;
}

export interface CachedPages {
    index?: number;
    page?: Search;
}

export interface SearchData {
  search: Search;
}

export interface Search {
  nodes: SearchNode[];
    pageInfo: PageInfo;
    repositoryCount: Number
}

export interface SearchNode {
  name: string;
  stargazerCount: number;
  updatedAt: string;
    url: string;
    owner: Owner;
}

export interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Owner {
    login: string;
}