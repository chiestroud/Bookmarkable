import React, { useEffect, useState } from 'react';
import {
  Card, CardLink, CardText, CardTitle
} from 'reactstrap';
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
  console.warn(publicCategory);

  return (
    <section>
      <header>Open Space</header>
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
