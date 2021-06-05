import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardTitle, CardLink, CardText, Button
} from 'reactstrap';
import { deletePersonalData } from '../helpers/data/personalData';
import PersonalForm from './PersonalForm';

export default function PersonalBookmarkCard({
  title,
  firebaseKey,
  url,
  comments,
  user,
  setPersonalCards,
  category
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
    <Card key={firebaseKey}>
      <CardTitle>{title}</CardTitle>
      <CardLink href={url} target='_blank'>{url}</CardLink>
      <CardText>{comments}</CardText>
      <Button onClick={() => handleClick('edit')}>{showForm ? 'Close' : 'Edit'}</Button>
      {showForm && <PersonalForm
        category={category}
      />}
      <Button onClick={() => handleClick('delete')}>Delete</Button>
    </Card>
  );
}

PersonalBookmarkCard.propTypes = {
  title: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  user: PropTypes.any,
  setPersonalCards: PropTypes.func,
  category: PropTypes.array
};
