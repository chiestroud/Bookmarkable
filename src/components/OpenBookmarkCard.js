import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardText,
  Button,
  CardLink
} from 'reactstrap';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import OpenSpaceBookmarkForm from './OpenSpaceBookmarkForm';
import { deletePublicBookmark } from '../helpers/data/openSpaceData';
import BookmarkForm from './BookmarkForm';
import { IndividualCardStyle } from '../styles/BookmarkStyle';
import { getBookmarkLikesFromId } from '../helpers/data/publicBookmarkLikesData';
import LikeReportButton from './LikeReportButton';

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

  const [allLikes, setAllLikes] = useState([]);

  useEffect(() => {
    getBookmarkLikesFromId(firebaseKey).then((response) => setAllLikes(response));
  }, []);

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
      <span>
        <Button
          className='bookmarkbtn' t
            itle='bookmark?'
            onClick={() => handleClick('categoryList')}><i className="far fa-bookmark"></i>
        </Button>
      </span>
      {showCategory
        && <BookmarkForm
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
      <CardTitle className='cardTitle'>{title}</CardTitle>
      <LinkPreview url={url} descriptionLength='50' imageHeight='120px'/>
      <CardLink href={url} target='_blank'>{url}</CardLink>
        <CardText>{comments}</CardText>
        <LikeReportButton allLikes={allLikes} firebaseKey={firebaseKey} uid={uid} setAllLikes={setAllLikes} setPublicBookmarks={setPublicBookmarks} user={user}/>
      <div>
        {(user && user.uid === uid) && <Button color='warning' onClick={() => handleClick('edit')}>{showForm ? 'Close' : 'Edit'}</Button>}
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
        {((user && admin) || (user && user.uid === uid)) && <Button color='danger' onClick={() => handleClick('delete')}>Delete</Button>}
      </div>
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
