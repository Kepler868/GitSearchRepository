import { configureStore } from '@reduxjs/toolkit';
import { userListReducer } from '../components/repositoryList/userListLogic/store/userListReducer';
import { searchListReducer } from '../components/repositoryList/searchListLogic/store/searchListReducer';
import { repositoryReducer } from '../components/repositoryList/repositoryItem/store/repositoryStore';

export const store = configureStore({
    reducer: {
        userList: userListReducer,
        storeList: searchListReducer,
        repositoryList: repositoryReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;