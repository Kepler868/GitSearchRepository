import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { searchListActions } from "../repositoryList/searchListLogic/store/searchListReducer";
import { getSearchRepos } from "../repositoryList/searchListLogic/store/thunk";
import styles from "./SearchBar.module.css";
import logo from "./images/logo.png";
import home from "./images/home.png";
import { FC } from "react";
const SearchBar: FC = (): JSX.Element => {
  const [request, setRequest] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    setRequest(e.target.value);
  };

  const handleHome = (): void => {
    setRequest("");
    dispatch(searchListActions.setCurrentSearchRequest(""));
  };

  const handleFind = (): void => {
    dispatch(searchListActions.setCurrentSearchRequest(request));
    dispatch(getSearchRepos({ query: request }));
    dispatch(searchListActions.setNewRequest());
  };

  return (
    <div className={styles.input_block}>
      <img className={styles.search_img} src={logo} alt="" />
      <div className={styles.search_nav}>
        <a className={styles.input_title}>Search repository by name</a>
        <div className={styles.search}>
          <input
            className={styles.search_input}
            placeholder="Type repository name"
            onChange={handleSearch}
            value={request}
          ></input>
          <button
            className={styles.search_button}
            onClick={() => handleFind()}
            onKeyDown={() => handleFind()}
          >
            Search
          </button>
        </div>
      </div>
      <img
        onClick={() => handleHome()}
        className={styles.search_home}
        src={home}
        alt=""
      />
    </div>
  );
};

export default SearchBar;
