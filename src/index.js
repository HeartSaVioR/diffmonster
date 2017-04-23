import * as firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as GithubAuth from './GithubAuth';
import './index.css';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBovmje_t2kOCWvlSOTLJz5z40zHSduEKo",
  authDomain: "diffmonster-8550b.firebaseapp.com",
  databaseURL: "https://diffmonster-8550b.firebaseio.com",
  projectId: "diffmonster-8550b",
  storageBucket: "diffmonster-8550b.appspot.com",
  messagingSenderId: "518719670623"
};
firebase.initializeApp(config);
window.firebase = firebase;

GithubAuth.initialize().then(() => {
  fetch('https://api.github.com/repos/dittos/animeta/pulls', {
      headers: {
        'Authorization': `token ${GithubAuth.getAccessToken()}`
      }
      })
  .then(r => r.json())
    .then(data => console.log(data));

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
