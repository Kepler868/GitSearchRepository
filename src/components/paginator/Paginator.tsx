import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { searchListActions } from "../repositoryList/searchListLogic/store/searchListReducer";
import { getSearchRepos } from "../repositoryList/searchListLogic/store/thunk";
import { getUserRepos } from "../repositoryList/userListLogic/store/thunk";
import { userListActions } from "../repositoryList/userListLogic/store/userListReducer";
import styles from "./Paginator.module.css";
import { UserPageInfo } from "../repositoryList/userListLogic/interfaces/interfaces";
import { PageInfo } from "../repositoryList/searchListLogic/interfaces/interfaces";

const Paginator: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const selector: string = useSelector(
    (state: RootState) => state.storeList.currentSearchRequest
  );
  // User List Consts

  const currentUserPage: number = useSelector(
    (state: RootState) => state.userList.currentPage
  );
  const cachedUserPagesLength: number = useSelector(
    (state: RootState) => state.userList.cachedUserPages.length
  );
  const userRepoCount: number = useSelector(
    (state: RootState) => state.userList.userRepos.data?.viewer.repositories.totalCount
  ) as number;
  const userCursor: UserPageInfo | undefined = useSelector(
    (state: RootState) => state.userList.userRepos.data?.viewer.repositories.pageInfo
  );

  // Search List consts

  const currentSearchPage: number = useSelector(
    (state: RootState) => state.storeList.currentPage
  );
  const cachedSearchPagesLength: number = useSelector(
    (state: RootState) => state.storeList.cachedPages.length
  );
  const currentSearchRequest: string = useSelector(
    (state: RootState) => state.storeList.currentSearchRequest
  );

  const searchRepoCount: number = useSelector(
    (state: RootState) =>
      state.storeList.searchRepos.data?.search.repositoryCount as number
  );

  const searchCursor: PageInfo | undefined = useSelector(
    (state: RootState) => state.storeList.searchRepos.data?.search.pageInfo
  );

  // Handlers

  const handleNextPage = (): void => {
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

  const handlePrevPage = (): void => {
    !selector
      ? dispatch(userListActions.decrementCurrentPage())
      : dispatch(searchListActions.decrementCurrentPage());
  };

    // Current Paginator Consts
    
  const disabledButton: boolean = !selector
    ? currentUserPage <= 0
    : currentSearchPage <= 0;
  const currentPage: number = !selector ? currentUserPage : currentSearchPage;
  const repoCount: number = !selector ? userRepoCount : searchRepoCount;
  const secondPageNumber: number = (currentPage + 1) * 10;
  const firstPageNumber: number = secondPageNumber - 9;

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
