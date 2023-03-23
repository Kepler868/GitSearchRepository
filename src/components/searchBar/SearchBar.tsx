import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { searchListActions } from "../repositoryList/searchList/store/searchListReducer";
import { getSearchRepos } from "../repositoryList/searchList/store/thunk";

const SearchBar = () => {
    const [request, setRequest] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>();
    

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>):void => {
      e.preventDefault();
      setRequest(e.target.value)

  };
    
    const handleFind = () => {
        dispatch(searchListActions.setCurrentSearchRequest(request));
        dispatch(getSearchRepos({ query: request }));
        dispatch(searchListActions.setNewRequest())
    }

  return (
    <div>
      <a>Search repository by name</a>
          <input placeholder="Type repository name" onChange={handleSearch}></input>
          <button onClick={() => handleFind()}>Найти</button>
    </div>
  );
};

export default SearchBar;
