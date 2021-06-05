import React, { useEffect, useState } from 'react';
import OpenBookmarkCard from '../components/OpenBookmarkCard';
import OpenSpaceBookmarkForm from '../components/OpenSpaceBookmarkForm';
import { getPublicBookmarks } from '../helpers/data/openSpaceData';
import getPublicCategoryData from '../helpers/data/publicCategoryData';

export default function OpenSpace() {
  const [publicBookmarks, setPublicBookmarks] = useState([]);
  const [publicCategory, setPublicCategory] = useState([]);

  useEffect(() => {
    getPublicBookmarks().then((response) => setPublicBookmarks(response));
  }, []);

  useEffect(() => {
    getPublicCategoryData().then((response) => setPublicCategory(response));
  }, []);

  return (
    <section>
      <header>Open Space</header>
      <OpenSpaceBookmarkForm
        formTitle='Add Public Bookmark'
        publicCategory={publicCategory}
        setPublicBookmarks={setPublicBookmarks}
      />
      {publicBookmarks.map((publicBookmark) => (
        <OpenBookmarkCard
          key={publicBookmark.firebaseKey}
          {...publicBookmark}
        />
      ))}
    </section>
  );
}
