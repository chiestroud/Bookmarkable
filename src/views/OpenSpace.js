import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardLink, CardText, CardTitle
} from 'reactstrap';
import OpenSpaceBookmarkForm from '../components/OpenSpaceBookmarkForm';
import { getPublicBookmarks } from '../helpers/data/openSpaceData';
import getPublicCategoryData from '../helpers/data/publicCategoryData';

export default function OpenSpace({ user }) {
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
        formTitle='Add Bookmark'
        publicCategory={publicCategory}
        setPublicCategory={setPublicCategory}
        setPublicBookmarks={setPublicBookmarks}
        user={user}
      />
      {publicBookmarks.map((publicBookmark) => (
        <Card key={publicBookmark.firebaseKey}>
          <CardTitle>{publicBookmark.title}</CardTitle>
          <CardLink href={publicBookmark.url} target='_blank'>{publicBookmark.url}</CardLink>
          <CardText>{publicBookmark.comments}</CardText>
        </Card>
      ))}
    </section>
  );
}

OpenSpace.propTypes = {
  user: PropTypes.any
};
