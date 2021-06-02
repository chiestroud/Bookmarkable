import React, { useEffect, useState } from 'react';
import {
  Card, CardLink, CardText, CardTitle
} from 'reactstrap';
import getPublicBookmarks from '../helpers/data/openSpaceData';

export default function OpenSpace() {
  const [publicBookmarks, setPublicBookmarks] = useState([]);

  useEffect(() => {
    getPublicBookmarks().then((response) => setPublicBookmarks(response));
  }, []);

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
