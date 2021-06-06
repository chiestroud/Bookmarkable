import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardTitle, CardLink, CardText, Button
} from 'reactstrap';
import { deletePersonalData } from '../helpers/data/personalData';
import PersonalForm from './PersonalForm';
import { IndividualCardStyle } from '../styles/BookmarkStyle';

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
    <IndividualCardStyle>
    <Card key={firebaseKey}>
      <CardTitle>{title}</CardTitle>
      <CardLink href={url} target='_blank'>{url}</CardLink>
      <CardText>{comments}</CardText>
      <Button color='warning' onClick={() => handleClick('edit')}>{showForm ? 'Close' : 'Edit'}</Button>
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
    </Card>
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
