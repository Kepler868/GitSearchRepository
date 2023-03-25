import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginator from '../components/paginator/Paginator';
import { getUserRepos } from "../components/repositoryList/userListLogic/store/thunk";
import Header from "../modules/Header/Header";
import Main from '../modules/Main/Main';
import { AppDispatch } from "../store/store";
import styles from "./mainPage.module.css";

const MainPage = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(getUserRepos({}));
  }, [dispatch]);

  const userRepos = useSelector((store) => store);
  console.log(userRepos);
  return (
    <div className={styles.App}>
      <Header />
          <Main />
          <Paginator/>
    </div>
  );
};

export default MainPage;
