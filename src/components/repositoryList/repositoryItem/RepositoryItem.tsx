import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import Modal from "../../modal/Modal";
import styles from "./RepositoryItem.module.css";
import { repositoryActions } from './store/repositoryStore';
import { getCurrentRepository } from "./store/thunk";
const RepositoryItem = ({ item }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRepositoryClick = () => {
      dispatch(getCurrentRepository({ name: item.name, owner: item.owner.login }));
      dispatch(repositoryActions.setModalActive(true))
  };
  return (
    <>
      <div onClick={() => handleRepositoryClick()} className={styles.list_item}>
        <div>{item.name}</div>
        <div>{item.updatedAt}</div>
        <div>{item.stargazerCount}</div>
        <div>{item.url}</div>
      </div>
    </>
  );
};

export default RepositoryItem;
