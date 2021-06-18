import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CardButtonStyle } from '../../styles/BookmarkStyle';
import { updatePublicBookmark } from '../../helpers/data/openSpaceData';
import { getCurrentUserUid } from '../../helpers/data/userData';
import { addPublicBookmarkLikes, deletePublicBookmarkLikes } from '../../helpers/data/publicBookmarkLikesData';

export default function LikeReportButton({
  firebaseKey,
  allLikes,
  setPublicBookmarks,
  setAllLikes,
  user
}) {
  const [reported, setReported] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (allLikes.filter((res) => res.uid === user.uid).length) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  });

  const handleToggle = () => {
    const filter = allLikes.filter((res) => res.uid === user.uid);
    if (!filter.length) {
      const obj = {
        firebaseKey: '',
        uid: getCurrentUserUid(),
        bookmarkId: firebaseKey
      };
      addPublicBookmarkLikes(obj, firebaseKey).then((response) => setAllLikes(response));
    } else if (filter.length) {
      const firebasekey = filter[0].firebaseKey;
      deletePublicBookmarkLikes(firebasekey, firebaseKey).then((data) => setAllLikes(data));
    }
  };

  const handleReport = () => {
    const obj = {
      firebaseKey,
      reported: true
    };
    updatePublicBookmark(obj).then((response) => setPublicBookmarks(response));
    setReported(true);
  };
  return (
    <CardButtonStyle>
      <div className='starAndCount'>
        <motion.button
          id={liked ? 'likedBtn' : 'unLikedBtn'}
          onClick={handleToggle}
          title='Like?'
          whileHover={{ scale: 1.3 }}
        ><i className="fas fa-star fa-lg"></i></motion.button>
        <span className='likesCount'>
          {allLikes.map((response) => response).length} likes
        </span>
      </div>
      <div>
        <motion.button
          id='reportBtn'
          onClick={handleReport}
          title='Report?'
          whileHover={{ scale: 1.3 }}
        ><i className="fas fa-ban fa-lg"></i></motion.button>
      <span>{reported ? 'Reported' : 'Report?'}</span>
      </div>
    </CardButtonStyle>
  );
}

LikeReportButton.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  allLikes: PropTypes.array,
  setAllLikes: PropTypes.func,
  setPublicBookmarks: PropTypes.func,
  user: PropTypes.any,
  handleToggle: PropTypes.func,
  func: PropTypes.func
};
