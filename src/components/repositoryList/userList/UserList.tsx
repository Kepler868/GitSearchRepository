import React from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { RootState } from "../../../store/store";
import RepositoryItem from "../repositoryItem/RepositoryItem";

const UserList = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.userList.isLoading);
  const currentPage = useSelector((state: RootState) => state.userList.currentPage);
  const userRepos = useSelector((state: RootState) => state.userList.cachedUserPages);

  if (isLoading === false) {
    return (
      <div>
        {userRepos[currentPage].nodes &&
                userRepos[currentPage].nodes.map((node: any) => <RepositoryItem key={ uuid()}item={node} />)}
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserList;
