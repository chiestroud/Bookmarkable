import axios from 'axios';
import firebase from 'firebase';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getCurrentUserUid = () => firebase.auth().currentUser?.uid;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const getSingleUser = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

const addUser = (user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users.json`, user)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/users/${response.data.name}.json`, body)
        .then(() => getUsers().then((userArray) => resolve(userArray)));
    }).catch((err) => reject(err));
});

export {
  getCurrentUserUid, getUsers, getSingleUser, addUser
};
