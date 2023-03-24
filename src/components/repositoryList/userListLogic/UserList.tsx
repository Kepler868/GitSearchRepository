import React, { FC } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { RootState } from "../../../store/store";
import RepositoryItem from "../repositoryItem/RepositoryItem";
import {  UserRepos } from "./interfaces/interfaces";

const UserList: FC = (): JSX.Element => {
  const isLoading: boolean = useSelector((state: RootState) => state.userList.isLoading);
  const currentPage: number = useSelector(
    (state: RootState) => state.userList.currentPage
  );
  const userRepos: UserRepos[] = useSelector(
    (state: RootState) => state.userList.cachedUserPages
  );
    

    if (isLoading === false) {

    return (
      <div>
        {userRepos[currentPage].nodes &&
          userRepos[currentPage].nodes.map((node: any) => (
            <RepositoryItem key={uuid()} item={node} />
          ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserList;
