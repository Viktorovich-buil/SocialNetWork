import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import SignInContainer from "./Components/Login/SignInContainer";



const AppContainer = (props) => {
  return (
      <div>
        <SignInContainer />
      </div>
  );
}

const SocialNetApp = (props) => {
  return <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
};

export default SocialNetApp;
