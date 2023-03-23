import { useSelector } from "react-redux";
import Modal from '../../components/modal/Modal';
import SearchList from "../../components/repositoryList/searchList/SearchList";
import UserList from "../../components/repositoryList/userList/UserList";
import {  RootState } from "../../store/store";

const Main = () => {
  const isSearching = useSelector(
    (state: RootState) => state.storeList.currentSearchRequest
  );
    return (
      <>
            {isSearching ? <SearchList /> : <UserList />}
            <Modal/>
        
      </>
    );
  
};

export default Main;
