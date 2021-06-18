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
    <Button id='categoryDeleteBtn' key={firebaseKey} onClick={handleSubmit}><i className="far fa-trash-alt mr-2"></i>Remove</Button>
  );
}

DeleteButton.propTypes = {
  setCategory: PropTypes.func,
  firebaseKey: PropTypes.string.isRequired,
  user: PropTypes.any
};
