import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { repositoryActions } from "../repositoryList/repositoryItem/store/repositoryStore";
import styles from "./Modal.module.css";
import uuid from 'react-uuid';
const Modal = () => {


  const dispatch = useDispatch<AppDispatch>();
  const activeModal = useSelector(
    (state: RootState): boolean => state.repositoryList.activeModal
  );
  const repositoryList = useSelector((state: RootState) => state.repositoryList);
  const isLoading = useSelector(
    (state: RootState): Boolean => state.repositoryList.isLoading
  );

  const handleClose = () => {
    dispatch(repositoryActions.setModalActive(false));

  };  

  if (!isLoading) {
    const repository = repositoryList.repositoryData.data?.repository as any;
    

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
          <div>
            <div>{repository.name}</div>
            <div>{repository.stargazerCount}</div>
            <div>{repository.updatedAt}</div>
          </div>
          <div>
                    <img style={{ width: '100px'}} src={repository.owner.avatarUrl}  alt=""/>
            <div>{repository.owner.login}</div>
          </div>
          <div>{repository.description}</div>
                <div>{repository.languages.nodes.map((el:any) => <div key={uuid()} style={{color:`${el.color}`}}>{el.name}</div>)}</div>
        </div>
      </div>
    );
  } else {
    return <div>loader</div>;
  }
};

export default Modal;
