import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CardTitle, CardLink, CardText, Button
} from 'reactstrap';
import { motion } from 'framer-motion';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { deletePersonalData } from '../../helpers/data/personalData';
import PersonalForm from './PersonalForm';
import { IndividualCardStyle } from '../../styles/BookmarkStyle';

export default function PersonalBookmarkCard({
  title,
  firebaseKey,
  url,
  comments,
  user,
  setPersonalCards,
  category,
  categoryId
}) {
  const [showForm, setShowForm] = useState(false);
  const handleClick = (type) => {
    if (type === 'edit') {
      setShowForm((prevState) => !prevState);
    } else if (type === 'delete') {
      deletePersonalData(firebaseKey, user).then((response) => setPersonalCards(response));
    }
  };

  return (
    <IndividualCardStyle className='individualCardStyle'>
      <motion.div className='publicCard' key={firebaseKey}
        whileHover={{ scale: 1.05 }}
      >
        <CardTitle className='cardTitle'><CardLink href={url} target='_blank'><motion.p className='cardTitleLink' whileHover={{ scale: 1.1 }}>{title}</motion.p></CardLink></CardTitle>
        <CardLink href={url} target='_blank'><LinkPreview url={url} descriptionLength='50' imageHeight='150px' height='300px'/></CardLink>
        <CardText>{comments}</CardText>
        <Button color='warning' className='editBtn' onClick={() => handleClick('edit')}>{showForm ? 'Close' : 'Edit'}</Button>
        {showForm
          && <PersonalForm
          formTitle='Edit Bookmark'
          user={user}
          category={category}
          categoryId={categoryId}
          setShowForm={setShowForm}
          firebaseKey={firebaseKey}
          title={title}
          url={url}
          comments={comments}
          setPersonalCards={setPersonalCards}
        />}
        <Button color='danger' onClick={() => handleClick('delete')}>Delete</Button>
      </motion.div>
    </IndividualCardStyle>
  );
}

PersonalBookmarkCard.propTypes = {
  title: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  user: PropTypes.any,
  setPersonalCards: PropTypes.func,
  category: PropTypes.array,
  categoryId: PropTypes.string
};