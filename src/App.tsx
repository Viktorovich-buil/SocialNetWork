import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import SignInContainer from "./Components/Login/SignInContainer";
import 'antd/dist/antd.css';



const AppContainer : React.FC = (props) => {
  return (
      <div>
        <SignInContainer />
      </div>
  );
}

const SocialNetApp : React.FC = (props) => {
  return <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
};

export default SocialNetApp;
