import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDaPzzOHazOsQ3tIUopXkxNx-kO4wTCU1s",
    authDomain: "language-bridge-5d49e.firebaseapp.com",
    projectId: "language-bridge-5d49e",
    storageBucket: "language-bridge-5d49e.appspot.com",
    messagingSenderId: "588200437720",
    appId: "1:588200437720:web:47b616d816e75a43ea34ad",
    measurementId: "G-C45VN1SNS6"
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
