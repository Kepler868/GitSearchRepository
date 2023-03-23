// userListReducers interfaces

export interface UserList {
  userRepos: UserRepos;
  isLoading: boolean;
}

export interface UserRepos {
  data?: Data;
}

export interface Data {
  viewer: Viewer;
}

export interface Viewer {
  repositories: Repositories;
}

export interface Repositories {
  nodes: Node[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface Node {
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
}

export interface IUserReposState {
    userRepos: UserRepos;
    cachedUserPages: any[];
    currentPage: number;
  isLoading: boolean;
}

export interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
