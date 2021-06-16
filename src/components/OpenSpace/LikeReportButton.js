import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
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
      <div><Button id={liked ? 'likedBtn' : 'unLikedBtn'} onClick={handleToggle} title='Like?'><i className="fas fa-star"></i></Button><span className='ml-2'>
        {allLikes.map((response) => response).length} likes</span></div>
      <div><Button id='reportBtn' onClick={handleReport} title='Report?'><i className="fas fa-ban"></i></Button></div>
      <div>{reported ? 'Reported' : ''}</div>
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
