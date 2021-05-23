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
  apiKey: "AIzaSyCeOlsw7DTG1LsyhNkjB8HsoFRJviu41Sc",
  authDomain: "language-bridge-4ebec.firebaseapp.com",
  projectId: "language-bridge-4ebec",
  storageBucket: "language-bridge-4ebec.appspot.com",
  messagingSenderId: "258423067732",
  appId: "1:258423067732:web:4deef4d95c0a92e3e549c1",
  measurementId: "G-8QELQ1VZ6M"
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
