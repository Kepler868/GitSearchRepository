import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SearchPaginator from "./searchPaginator/SearchPaginator";
import UserPaginator from "./userPaginator/UserPaginator";

const Paginator = () => {
  const isActiveSearch = useSelector(
    (state: RootState) => state.storeList.currentSearchRequest
  );
  
  
  
  if (!isActiveSearch) {
    return <UserPaginator />;
  } else {
    return <SearchPaginator />;
  }
};

export default Paginator;
