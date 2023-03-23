import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./globals.css";
import MainPage from "./pages/MainPage";
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement); ;
root.render(

    <Provider store={store}>
      <MainPage />
    </Provider>

);
