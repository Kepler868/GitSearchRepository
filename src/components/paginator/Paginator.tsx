import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { searchListActions } from "../repositoryList/searchListLogic/store/searchListReducer";
import { getSearchRepos } from "../repositoryList/searchListLogic/store/thunk";
import { getUserRepos } from "../repositoryList/userListLogic/store/thunk";
import { userListActions } from "../repositoryList/userListLogic/store/userListReducer";
import SearchPaginator from "./searchPaginator/SearchPaginator";
import UserPaginator from "./userPaginator/UserPaginator";
import styles from "./Paginator.module.css"

const Paginator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector(
    (state: RootState) => state.storeList.currentSearchRequest
  );
  // User List Consts

  const currentUserPage = useSelector((state: RootState) => state.userList.currentPage);
  const cachedUserPagesLength = useSelector(
    (state: RootState) => state.userList.cachedUserPages.length
  );
  const userRepoCount = useSelector(
    (state: RootState) => state.userList.userRepos.data?.viewer.repositories.totalCount
  ) as number;
  const userCursor = useSelector(
    (state: RootState) => state.userList.userRepos.data?.viewer.repositories.pageInfo
  );

  // Search List consts

  const currentSearchPage = useSelector(
    (state: RootState): number => state.storeList.currentPage
  );
  const cachedSearchPagesLength = useSelector(
    (state: RootState) => state.storeList.cachedPages.length
  );
  const currentSearchRequest = useSelector(
    (state: RootState): string => state.storeList.currentSearchRequest
  );

  const searchRepoCount = useSelector(
    (state: RootState) =>
      state.storeList.searchRepos.data?.search.repositoryCount as number
  );

  const searchCursor = useSelector(
    (state: RootState) => state.storeList.searchRepos.data?.search.pageInfo
  );

  // Handlers

  const handleNextPage = () => {
    if (!selector) {
      if (currentUserPage + 2 > cachedUserPagesLength) {
        dispatch(getUserRepos({ after: userCursor?.endCursor }));
      }
      dispatch(userListActions.incrementCurrentPage());
    } else if (selector) {
      if (currentSearchPage + 2 > cachedSearchPagesLength) {
        dispatch(getSearchRepos({ query: selector, after: searchCursor?.endCursor }));
      }

      dispatch(searchListActions.setCurrentPaginationRequest(currentSearchRequest));
      dispatch(searchListActions.incrementCurrentPage());
    }
  };

  const handlePrevPage = () => {
    !selector
      ? dispatch(userListActions.decrementCurrentPage())
      : dispatch(searchListActions.decrementCurrentPage());
  };

  const disabledButton = !selector ? currentUserPage <= 0 : currentSearchPage <= 0;
  const currentPage = !selector ? currentUserPage : currentSearchPage;
  const repoCount = !selector ? userRepoCount : searchRepoCount;
  const secondPageNumber = (currentPage + 1) * 10;
  const firstPageNumber = secondPageNumber - 9;

  return (
    <div className={styles.paginator}>
      <div className={styles.paginator_up}>
        <button
          className={styles.paginator_button}
          disabled={disabledButton}
          onClick={() => handlePrevPage()}
        >
          Previous
        </button>
        {typeof repoCount === "number" ? (
          <a>
            {firstPageNumber}-
            {secondPageNumber > repoCount ? repoCount : secondPageNumber} of{" "}
            {repoCount > 100 ? 100 : repoCount}
          </a>
        ) : (
          <></>
        )}
        <button
          className={styles.paginator_button}
          disabled={currentPage >= 9 || currentPage + 2 > Math.ceil(repoCount / 10)}
          onClick={() => handleNextPage()}
        >
          Next
        </button>
      </div>
      <div className={styles.paginator_down}>
        <a>Results: {repoCount} repositories</a>
      </div>
    </div>
  );
};

export default Paginator;
