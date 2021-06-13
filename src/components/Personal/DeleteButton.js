import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { deletePersonalCategoryData } from '../../helpers/data/categoryData';

export default function DeleteButton({
  setCategory,
  firebaseKey,
  user
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    deletePersonalCategoryData(firebaseKey, user).then((response) => setCategory(response));
  };
  return (
    <Button color='danger' key={firebaseKey} onClick={handleSubmit}>Remove</Button>
  );
}

DeleteButton.propTypes = {
  setCategory: PropTypes.func,
  firebaseKey: PropTypes.string.isRequired,
  user: PropTypes.any
};
