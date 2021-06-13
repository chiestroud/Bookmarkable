import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  CardTitle,
  CardText,
  Button,
  CardLink
} from 'reactstrap';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import OpenSpaceBookmarkForm from './OpenSpaceBookmarkForm';
import { deletePublicBookmark } from '../../helpers/data/openSpaceData';
import BookmarkForm from './BookmarkForm';
import { IndividualCardStyle } from '../../styles/BookmarkStyle';
import { getBookmarkLikesFromId } from '../../helpers/data/publicBookmarkLikesData';
import LikeReportButton from './LikeReportButton';

export default function OpenBookmarkCard({
  firebaseKey,
  title,
  url,
  comments,
  categoryId,
  uid,
  user,
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
    <IndividualCardStyle className='individualCardStyle'>
      <motion.div className='publicCard' key={firebaseKey}
        whileHover={{ scale: 1.05 }}
      >
        <span>
          <Button
            className='bookmarkbtn'
            title='bookmark?'
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
        <CardTitle className='cardTitle'><CardLink href={url} target='_blank'><motion.p className='cardTitleLink' whileHover={{ scale: 1.1 }}>{title}</motion.p></CardLink></CardTitle>
        <LinkPreview url={url} descriptionLength='50' imageHeight='120px' height='300px'/>
        <CardText>{comments}</CardText>
        <LikeReportButton
          allLikes={allLikes}
          firebaseKey={firebaseKey}
          uid={uid}
          setAllLikes={setAllLikes}
          setPublicBookmarks={setPublicBookmarks}
          user={user}
        />
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
            setShowForm={setShowForm}
            categoryId={categoryId}
            setOpenForm={setOpenForm}
          />}
        {((user && admin) || (user && user.uid === uid)) && <Button color='danger' onClick={() => handleClick('delete')}>Delete</Button>}
      </motion.div>
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
  publicCategory: PropTypes.array,
  setPublicBookmarks: PropTypes.func,
  admin: PropTypes.any,
  categoryId: PropTypes.string,
  setOpenForm: PropTypes.func
};
