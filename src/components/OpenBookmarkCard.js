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
import { deletePublicBookmark } from '../helpers/data/openSpaceData';
import BookmarkForm from './BookmarkForm';
import { CardButtonStyle, IndividualCardStyle } from '../styles/BookmarkStyle';

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
  const [likeColor, setLikeColor] = useState(false);
  const [like, setLike] = useState(likes);

  const toggleLike = () => {
    setLikeColor((prevState) => !(prevState));
    if (!likeColor) {
      setLike((prevState) => prevState + 1);
    } else {
      setLike((prevState) => prevState - 1);
    }
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
        <div><LinkPreview url={url} descriptionLength='50' imageHeight='150px'/></div>
        <CardLink href={url} target='_blank'>{url}</CardLink>
        <CardText>{comments}</CardText>
        <CardButtonStyle>
          <div><Button onClick={toggleLike} id={likeColor ? 'starBtnOn' : 'starBtnOff'} title='Like?'><i className="far fa-star"></i></Button><span className='ml-2'>{like}</span></div>
          <div><Button title='Report?'><i className="fas fa-ban"></i></Button></div>
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
