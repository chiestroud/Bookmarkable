import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPublicBookmarkLikes = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark_likes.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const getSingleBookmarkLikes = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark_likes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const getBookmarkLikesFromId = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark_likes.json?orderBy="bookmarkId"&equalTo="${firebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const getBookmarkLikesFromFirebasekey = (key) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark_likes.json?orderBy="bookmarkId"&equalTo="${key.firebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const addPublicBookmarkLikes = (obj, firebaseKey) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/public_bookmark_likes.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/public_bookmark_likes/${response.data.name}.json`, body)
        .then(() => {
          getBookmarkLikesFromId(firebaseKey).then((returnedArray) => resolve(returnedArray));
        });
    }).catch((err) => reject(err));
});

const deletePublicBookmarkLikes = (firebasekey, firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/public_bookmark_likes/${firebasekey}.json`)
    .then(() => getBookmarkLikesFromId(firebaseKey).then((journalArray) => resolve(journalArray)))
    .catch((err) => reject(err));
});

export {
  getPublicBookmarkLikes, addPublicBookmarkLikes, deletePublicBookmarkLikes, getSingleBookmarkLikes, getBookmarkLikesFromId, getBookmarkLikesFromFirebasekey
};
