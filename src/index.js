import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb1O1_62-m4kjxQGPmfQGjaI3h13Xs8sc",
  authDomain: "react-chat-app-b848f.firebaseapp.com",
  databaseURL: "https://react-chat-app-b848f.firebaseio.com",
  projectId: "react-chat-app-b848f",
  storageBucket: "react-chat-app-b848f.appspot.com",
  messagingSenderId: "435114098020",
  appId: "1:435114098020:web:6cc711f9065856434c0e71"
};


firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
