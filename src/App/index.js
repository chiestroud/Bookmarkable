import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../components/NavBar';
import firebaseConfig from '../helpers/apiKeys';
import { addUser, getSingleUser } from '../helpers/data/userData';
import Routes from '../helpers/Routes';
import './App.scss';

function App() {
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          displayName: authed.displayName,
          uid: authed.uid,
          photoURL: authed.photoURL,
          email: authed.email,
          admin: false
        };
        setUser(userInfoObj);
        if (userInfoObj.uid === firebaseConfig.userUid) {
          setAdmin(true);
        }
        getSingleUser(userInfoObj).then((response) => {
          if (Object.values(response.data).length === 0) {
            addUser(userInfoObj);
          }
        });
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <Router>
      <NavBar user={user} admin={admin}/>
      <Routes user={user} admin={admin}/>
    </Router>
  );
}

export default App;
