import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import uuid from "react-uuid";
import RepositoryItem from '../repositoryItem/RepositoryItem';
import { SearchRepos, SearchNode} from './interfaces/interfaces';
import { FC } from 'react';

const SearchList: FC = (): JSX.Element => {

  const isSearchLoading:boolean = useSelector((state: RootState) => state.storeList.isLoading);
    const currentPage:number = useSelector((state:RootState)=> state.storeList.currentPage)
    const cachedPages:SearchRepos[] = useSelector(
      (state: RootState) => state.storeList.cachedPages
    );
  if (isSearchLoading === false) {
    console.log(cachedPages[currentPage].nodes[0]);
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
