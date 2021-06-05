import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPublicBookmarks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const addPublicBookmarks = (dataObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/public_bookmark.json`, dataObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/public_bookmark/${response.data.name}.json`, body)
        .then(() => {
          getPublicBookmarks().then((returnedArray) => resolve(returnedArray));
        });
    }).catch((err) => reject(err));
});

const updatePublicBookmark = (bookmark) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/public_bookmark/${bookmark.firebaseKey}.json`, bookmark)
    .then(() => getPublicBookmarks().then(resolve))
    .catch((err) => reject(err));
});

const deletePublicBookmark = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/public_bookmark/${firebaseKey}.json`)
    .then(() => getPublicBookmarks().then((bookmarkArray) => resolve(bookmarkArray)))
    .catch((err) => reject(err));
});

const searchPublicBookmarks = (searchValues) => new Promise((resolve, reject) => {
  getPublicBookmarks().then((bookmarkArray) => {
    const searchItems = bookmarkArray.filter((word) => word.title.toLowerCase().includes(searchValues));
    resolve(searchItems);
  })
    .catch((err) => reject(err));
});

const searchPublicCategory = (firebaseKey) => new Promise((resolve, reject) => {
  getPublicBookmarks().then((bookmarkArray) => {
    const searchItems = bookmarkArray.filter((category) => category.categoryId.includes(firebaseKey));
    resolve(searchItems);
  })
    .catch((err) => reject(err));
});

export {
  getPublicBookmarks, addPublicBookmarks, deletePublicBookmark, updatePublicBookmark, searchPublicBookmarks, searchPublicCategory
};
