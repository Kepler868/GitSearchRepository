
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { getUserRepos } from '../../repositoryList/userListLogic/store/thunk';
import { userListActions } from '../../repositoryList/userListLogic/store/userListReducer';

const UserPaginator = () => {
    const dispatch = useDispatch<AppDispatch>()
    const currentPage = useSelector((state: RootState) => state.userList.currentPage)
    const cachedPagesLength = useSelector(
      (state: RootState) => state.userList.cachedUserPages.length
    );
    const userRepoCount = useSelector((state:RootState) => state.userList.userRepos.data?.viewer.repositories.totalCount) as number
  const userCursor = useSelector(
    (state: RootState) => state.userList.userRepos.data?.viewer.repositories.pageInfo
  );
    const handlePrevPage = () => {
        dispatch(userListActions.decrementCurrentPage())
    }
    const handleNextPage = () => {
        if (currentPage + 2 > cachedPagesLength) {
             dispatch(getUserRepos({after: userCursor?.endCursor}))
         }
       dispatch(userListActions.incrementCurrentPage());
     };

  return (
    <div>
      <button disabled={currentPage <= 0} onClick={() => handlePrevPage()}>
        prev
      </button>
      <button
        disabled={currentPage >= 9 || currentPage + 2 > Math.floor(userRepoCount / 10)}
        onClick={() => handleNextPage()}
      >
        next
      </button>
    </div>
  );
};

export default UserPaginator;
