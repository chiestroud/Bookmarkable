import React, { useState } from 'react';
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
import { deletePublicBookmark, updatePublicBookmark } from '../helpers/data/openSpaceData';
import BookmarkForm from './BookmarkForm';
import { CardButtonStyle, IndividualCardStyle } from '../styles/BookmarkStyle';
import { addPublicBookmarkLikes } from '../helpers/data/publicBookmarkLikes.js';

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
  const [reportColor, setReportColor] = useState(false);

  const [toggleLiked, setToggleLiked] = useState(false);
  const [like, setLike] = useState(false);
  const [bookmarkLikes, setBookmarkLikes] = useState([]);

  const handleToggle = async () => {
    setToggleLiked((prevState) => !prevState);
    setLike((prev) => (toggleLiked ? prev - 1 : prev + 1));
    if (like) {
      const obj = {
        firebaseKey: '',
        uid,
        bookmarkId: firebaseKey
      };
      addPublicBookmarkLikes(obj, firebaseKey).then((response) => setBookmarkLikes(response));
    }
  };

  console.warn(bookmarkLikes.length);

  const handleReport = () => {
    const obj = {
      firebaseKey,
      reported: true
    };
    updatePublicBookmark(obj).then((response) => setPublicBookmarks(response));
    setReportColor(true);
  };

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
      <CardButtonStyle>
        <div><Button onClick={handleToggle} title='Like?' id={like ? 'starBtnOn' : 'starBtnOff'}><i className="far fa-star"></i></Button><span className='ml-2'>{likes}</span></div>
        <div><Button className='reportBtn' color='danger' onClick={handleReport} title='Report?'><i className="fas fa-ban"></i></Button></div>
        <div>{reportColor ? 'Reported' : ''}</div>
      </CardButtonStyle>
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
