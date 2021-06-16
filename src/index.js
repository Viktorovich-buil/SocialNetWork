import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import SocialNetApp from "./App";



ReactDOM.render(<SocialNetApp />,document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

