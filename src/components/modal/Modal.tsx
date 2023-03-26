import { FC} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { repositoryActions } from "../repositoryList/repositoryItem/store/repositoryStore";
import styles from "./Modal.module.css";
import dayjs from "dayjs";
import uuid from "react-uuid";
import exit from "./images/exit.png";
import star from "../repositoryList/repositoryItem/images/star.png";
import {
    Language,
  RepositoryList,
} from "../repositoryList/repositoryItem/interfaces/interfaces";
import { ModalRepository } from './interfaces/interface';

const Modal: FC = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();
    
  const activeModal: Boolean = useSelector((state: RootState) => state.repositoryList.activeModal);
  const repositoryList: RepositoryList = useSelector((state: RootState) => state.repositoryList);
  const isLoading: Boolean = useSelector((state: RootState) => state.repositoryList.isLoading);

  const handleClose = (): void => {
    dispatch(repositoryActions.setModalActive(false));};

  if (!isLoading && repositoryList.repositoryData.data?.repository) {
    const repository: ModalRepository = repositoryList.repositoryData.data?.repository;

    return (
      <div
        className={
          activeModal ? `${styles.modal} ${styles.modal_active}` : `${styles.modal}`
        }
        onClick={() => handleClose()}
      >
        <div
          className={
            activeModal
              ? `${styles.content} ${styles.content_active}`
              : `${styles.content}`
          }
          onClick={(e) => e.stopPropagation()}
        >
          <img src={exit} className={styles.exit_button} onClick={handleClose} alt="" />
          <div className={styles.avatar_name}>
            <div className={styles.avatar}>
              <img src={repository.owner.avatarUrl} alt="" />
            </div>
            <div className={styles.name}>
              <div className={styles.name_element}>User: {repository.owner.login}</div>
              <div className={styles.name_element} style={{ marginBottom: "5px" }}>
                Repository name: {repository.name}
              </div>
              <div
                className={styles.name_element}
                style={{ display: "flex", color: "#9b9999", fontSize: "14px" }}
              >
                <a style={{ marginRight: "5px" }}>
                  Updated at {dayjs(repository.updatedAt).format(`MMMM, D, YYYY`)}
                </a>
                |
                <a className={styles.update_stargazer}>
                  <img
                    style={{
                      width: "15px",
                      height: "15px",
                      marginLeft: "5px",
                      marginRight: "2px",
                    }}
                    src={star}
                    alt=""
                  />
                  {repository.stargazerCount}
                </a>
              </div>
              <div className={styles.name_element}>
                Description: {repository.description}
              </div>
              <div className={styles.language_block}>
                {repository.languages?.nodes.map((el: Language) => (
                  <div key={uuid()} className={styles.language}>
                    <div
                      className={styles.round}
                      style={{ backgroundColor: el.color, marginRight: "5px" }}
                    />
                    <div>{el.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Modal;
