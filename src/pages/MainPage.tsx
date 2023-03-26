import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserRepos } from "../components/repositoryList/userListLogic/store/thunk";
import Footer from "../modules/Footer/Footer";
import Header from "../modules/Header/Header";
import Main from "../modules/Main/Main";
import { AppDispatch } from "../store/store";
import styles from "./mainPage.module.css";

const MainPage: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserRepos({}));
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default MainPage;
