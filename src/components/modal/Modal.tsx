import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { repositoryActions } from '../repositoryList/repositoryItem/store/repositoryStore';
import styles from "./Modal.module.css";
const Modal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const activeModal = useSelector((state: RootState):boolean => state.repositoryList.activeModal)
    

  return (
    <div
          className={
              activeModal ? `${styles.modal} ${styles.modal_active}` : `${styles.modal}`
          }
          onClick={() => dispatch(repositoryActions.setModalActive(false))}
     >
      <div
        className={
          activeModal ? `${styles.content} ${styles.content_active}` : `${styles.content}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => dispatch(repositoryActions.setModalActive(false))}>exit</button>
      </div>
    </div>
  );
};

export default Modal;
