import React from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import styles from "./Header.module.css"
const Header = () => {
    return (
      <div className={styles.header}>
        <SearchBar />
      </div>
    );
};

export default Header;