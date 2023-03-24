import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import RepositoryItem from "./repositoryItem/RepositoryItem";
import { SearchNode, SearchRepos } from "./searchListLogic/interfaces/interfaces";
import uuid from "react-uuid";
import { UserNode, UserRepos } from "./userListLogic/interfaces/interfaces";
import { FC } from 'react';

const RepositoryList:FC = ():JSX.Element => {
  // Search List Consts
  const isSearchLoading: boolean = useSelector(
    (state: RootState) => state.storeList.isLoading
  );
  const currentSearchPage: number = useSelector(
    (state: RootState) => state.storeList.currentPage
  );
  const cachedSearchPages: SearchRepos[] = useSelector(
    (state: RootState) => state.storeList.cachedPages
  );

  // User List Consts

  const isUserLoading: boolean = useSelector(
    (state: RootState) => state.userList.isLoading
  );
  const currentUserPage: number = useSelector(
    (state: RootState) => state.userList.currentPage
  );
  const cachedUserPages: UserRepos[] = useSelector(
    (state: RootState) => state.userList.cachedUserPages
  );

  // User vs Search Selector. If search request exists returns string(true)

  const selector:string = useSelector(
    (state: RootState) => state.storeList.currentSearchRequest
  );
  // Get list of repositories, currentPage and loading flag
  const repositories = selector ? cachedSearchPages : cachedUserPages;
  const currentPage = selector ? currentSearchPage : currentUserPage;
  const isLoading = selector ? isSearchLoading : isUserLoading;
  if (!isLoading) {
    return (
      <div>
        {repositories[currentPage] &&
          repositories[currentPage].nodes.map((node: SearchNode | UserNode) => (
            <RepositoryItem key={uuid()} item={node} />
          ))}
      </div>
    );
  }
  else {
      return <></>
    }
};

export default RepositoryList;
