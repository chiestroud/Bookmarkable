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

const addPublicBookmarkLikes = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/public_bookmark_likes.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/public_bookmark_likes/${response.data.name}.json`, body)
        .then(() => {
          getPublicBookmarkLikes().then((returnedArray) => resolve(returnedArray));
        });
    }).catch((err) => reject(err));
});

export { getPublicBookmarkLikes, addPublicBookmarkLikes };
