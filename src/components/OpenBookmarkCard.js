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
import BookmarkForm from './BookmarkForm';
import { IndividualCardStyle } from '../styles/BookmarkStyle';

export default function OpenBookmarkCard({
  firebaseKey,
  title,
  url,
  comments,
  categoryId,
  uid,
  user,
  likes,
  publicCategory,
  setPublicBookmarks,
  admin,
  setOpenForm
}) {
  const [showForm, setShowForm] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setShowForm((prevState) => !prevState);
        break;
      case 'delete':
        deletePublicBookmark(firebaseKey).then((response) => setPublicBookmarks(response));
        break;
      case 'categoryList':
        setShowCategory((prevState) => !prevState);
        break;
      default:
        console.warn('error');
    }
  };

  return (
    <IndividualCardStyle>
    <Card>
      <span><Button className='bookmarkbtn' title='bookmark?' onClick={() => handleClick('categoryList')}><i className="far fa-bookmark"></i></Button></span>
      {showCategory && <BookmarkForm
        publicCategory={publicCategory}
        firebaseKey={firebaseKey}
        title={title}
        categoryId={categoryId}
        url={url}
        comments={comments}
        uid={uid}
        user={user}
        setShowCategory={setShowCategory}
      />}
      <CardTitle>{title}</CardTitle>
      <CardLink href={url} target='_blank'>{url}</CardLink>
      <CardText>{comments}</CardText>
      {((user && user.uid === uid) || (user && admin === true))
        && <div>
        <Button color='warning' onClick={() => handleClick('edit')}>{showForm ? 'Close' : 'Edit'}</Button>
        {showForm && <OpenSpaceBookmarkForm
          formTitle='Edit Bookmark'
          publicCategory={publicCategory}
          setPublicBookmarks={setPublicBookmarks}
          firebaseKey={firebaseKey}
          title={title}
          url={url}
          comments={comments}
          uid={uid}
          user={user}
          likes={likes}
          setShowForm={setShowForm}
          categoryId={categoryId}
          setOpenForm={setOpenForm}
        />}
          <Button color='danger' onClick={() => handleClick('delete')}>Delete</Button>
        </div>
      }
    </Card>
    </IndividualCardStyle>
  );
}

OpenBookmarkCard.propTypes = {
  firebaseKey: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  comments: PropTypes.string,
  uid: PropTypes.string,
  user: PropTypes.any,
  likes: PropTypes.number,
  publicCategory: PropTypes.array,
  setPublicBookmarks: PropTypes.func,
  admin: PropTypes.any,
  categoryId: PropTypes.string,
  setOpenForm: PropTypes.func
};
