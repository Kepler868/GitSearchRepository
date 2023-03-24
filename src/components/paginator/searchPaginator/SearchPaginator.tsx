import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { searchListActions } from "../../repositoryList/searchListLogic/store/searchListReducer";
import { getSearchRepos } from "../../repositoryList/searchListLogic/store/thunk";

const SearchPaginator = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const isActiveSearch = useSelector(
    (state: RootState): string => state.storeList.currentSearchRequest
  );

  const currentPage = useSelector(
    (state: RootState): number => state.storeList.currentPage
  );
  const cachedPagesLength = useSelector(
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

  const handleNextPage = () => {
    // if (we have not next page in cached pages) {fetch github API for new data}
    // else {return page from cached pages}  repositoryList/SearchList.tsx
    if (currentPage + 2 > cachedPagesLength) {
      dispatch(getSearchRepos({ query: isActiveSearch, after: searchCursor?.endCursor }));
    }
    dispatch(searchListActions.incrementCurrentPage());
    dispatch(searchListActions.setCurrentPaginationRequest(currentSearchRequest));
  };

  const handlePrevPage = () => {
    dispatch(searchListActions.decrementCurrentPage());
  };
  return (
    <div>
      <button disabled={currentPage <= 0} onClick={handlePrevPage}>
        prev
      </button>
      {typeof searchRepoCount === "number" ? (
        <a>
          {searchRepoCount} {currentPage + 1} {isActiveSearch}
        </a>
      ) : (
        <></>
      )}
      <button
        disabled={currentPage >= 9 || currentPage + 1 > Math.floor(searchRepoCount / 10)}
        onClick={handleNextPage}
      >
        next
      </button>
    </div>
  );
};

export default SearchPaginator;
