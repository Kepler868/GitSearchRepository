import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import uuid from "react-uuid";
import RepositoryItem from '../repositoryItem/RepositoryItem';

const SearchList = (): JSX.Element => {

  const isSearchLoading = useSelector((state: RootState) => state.storeList.isLoading);
    const currentPage = useSelector((state:RootState)=> state.storeList.currentPage)
    const cachedPages = useSelector(
      (state: RootState) => state.storeList.cachedPages
    );
  if (isSearchLoading === false) {
    
    return (
      <div>
        {cachedPages[currentPage].nodes &&
                cachedPages[currentPage].nodes.map((node: any) => (
              <RepositoryItem key={uuid()} item={node}/>
            
          ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default SearchList;
