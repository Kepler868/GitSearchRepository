// userListReducers interfaces

export interface IUserReposState {
  userRepos: UserResponse;
  cachedUserPages: UserRepos[];
  currentPage: number;
  isLoading: boolean;
}

export interface UserResponse {
  data?: UserData;
}

export interface UserData {
  viewer: UserViewer;
}

export interface UserViewer {
  repositories: UserRepos;
}

export interface UserRepos {
  nodes: UserNode[];
  totalCount: number;
  pageInfo: UserPageInfo;
}

export interface UserNode {
  name: string;
  stargazerCount: number;
  updatedAt: string;
    url: string;
    description: string;
    owner: UserOwner
}

export interface UserOwner {
    login: string;
}

export interface UserPageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}


export interface UserListRequestArgs {
  after?: string;
}
