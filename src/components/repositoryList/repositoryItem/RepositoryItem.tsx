import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { ItemRepositoryProps } from "./interfaces/interfaces";
import styles from "./RepositoryItem.module.css";
import { repositoryActions } from "./store/repositoryStore";
import { getCurrentRepository } from "./store/thunk";
import dayjs from "dayjs";
import star from "./star.png";

const RepositoryItem: FC<ItemRepositoryProps> = ({ item }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const handleRepositoryClick = (): void => {
    dispatch(getCurrentRepository({ name: item.name, owner: item.owner.login }));
    dispatch(repositoryActions.setModalActive(true));
  };
  const name =
    `${item.owner.login}/${item.name}`.length > 40
      ? `${item.owner.login}/${item.name}`.substring(0, 40)
          : `${item.owner.login}/${item.name}`;
    
  const year = item.updatedAt.substring(0, 4);
  const date = dayjs(item.updatedAt).format(`MMMM, D${year !== "2023" ? ", YYYY" : ""}`);
  const description =
    item.description && item.description.length > 80
      ? `${item.description.substring(0, 80)}...`
          : item.description;
    
  return (
    <div onClick={() => handleRepositoryClick()} className={styles.list_item}>
      <div >
        <div className={styles.list_item_name}>
          <a href={item.url} target="_blank" onClick={(e) => e.stopPropagation()}>
            {name}
          </a>
          <div className={styles.list_item_date}>Updated at {date}</div>
        </div>
        <div className={styles.list_item_desc}>
          {description ? description : "No description"}
        </div>
      </div>
      <div className={styles.star}>
        <img style={{ width: "20px" }} src={star} />

        <div className={styles.star_right}>{item.stargazerCount}</div>
      </div>
    </div>
  );
};

export default RepositoryItem;
