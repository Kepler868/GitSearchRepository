import { FC } from 'react';
import Modal from '../../components/modal/Modal';
import RepositoryList from '../../components/repositoryList/RepositoryList';

const Main:FC = ():JSX.Element => {

    
    return (
      <>
            <RepositoryList />
            <Modal />
        
      </>
    );
  
};

export default Main;
