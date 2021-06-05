import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardLink,
  CardText,
  Button
} from 'reactstrap';
import OpenSpaceBookmarkForm from './OpenSpaceBookmarkForm';
import { deletePublicBookmark } from '../helpers/data/openSpaceData';

export default function OpenBookmarkCard({
  firebaseKey,
  title,
  url,
  comments,
  uid,
  user,
  publicCategory,
  setPublicBookmarks
}) {
  const [showForm, setShowForm] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setShowForm((prevState) => !prevState);
        break;
      case 'delete':
        deletePublicBookmark(firebaseKey).then((response) => setPublicBookmarks(response));
        break;
      default:
        console.warn('error');
    }
  };

  return (
    <Card key={firebaseKey}>
      <CardTitle>{title}</CardTitle>
      <CardLink href={url} target='_blank'>{url}</CardLink>
      <CardText>{comments}</CardText>
      {(user && user.uid === uid)
        && <div>
        <Button color='warning' onClick={() => handleClick('edit')}>{showForm ? 'Close' : 'Edit'}</Button>
        {showForm && <OpenSpaceBookmarkForm
          formTitle='Edit Bookmark'
          publicCategory={publicCategory}
        />}
          <Button color='danger' onClick={() => handleClick('delete')}>Delete</Button>
        </div>
      }
    </Card>
  );
}

OpenBookmarkCard.propTypes = {
  firebaseKey: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  comments: PropTypes.string,
  uid: PropTypes.string,
  user: PropTypes.any,
  publicCategory: PropTypes.array,
  setPublicBookmarks: PropTypes.func
};
