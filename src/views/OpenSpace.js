import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import OpenBookmarkCard from '../components/OpenBookmarkCard';
import OpenSpaceBookmarkForm from '../components/OpenSpaceBookmarkForm';
import { getPublicBookmarks } from '../helpers/data/openSpaceData';
import getPublicCategoryData from '../helpers/data/publicCategoryData';

export default function OpenSpace({ user }) {
  const [publicBookmarks, setPublicBookmarks] = useState([]);
  const [publicCategory, setPublicCategory] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    getPublicBookmarks().then((response) => setPublicBookmarks(response));
  }, []);

  useEffect(() => {
    getPublicCategoryData().then((response) => setPublicCategory(response));
  }, []);

  const handleClick = () => {
    setOpenForm((prevState) => !prevState);
  };

  return (
    <section>
      <header>Open Space</header>
      <Button onClick={handleClick}>{openForm ? 'Close Form' : 'Open Form'}</Button>
      {openForm && <OpenSpaceBookmarkForm
        formTitle='Add Public Bookmark'
        publicCategory={publicCategory}
        setPublicBookmarks={setPublicBookmarks}
        setOpenForm={setOpenForm}
      />}
      {publicBookmarks.map((publicBookmark) => (
        <OpenBookmarkCard
          key={publicBookmark.firebaseKey}
          {...publicBookmark}
          user={user}
          publicCategory={publicCategory}
          setPublicBookmarks={setPublicBookmarks}
        />
      ))}
    </section>
  );
}

OpenSpace.propTypes = {
  user: PropTypes.any
};
