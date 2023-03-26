import { FC } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import styles from "./Header.module.css"

const Header:FC = ():JSX.Element => {
    return (
      <div className={styles.header}>
        <SearchBar />
      </div>
    );
};

export default Header;