import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { getCurrentUserUid } from '../helpers/data/userData';
import { addPersonalCategoryData } from '../helpers/data/categoryData';

export default function CategoryForm({ formTitle, user, setCategory }) {
  const [openForm, setOpenForm] = useState(false);
  const [personalCategory, setPersonalCategory] = useState({
    categoryName: '',
    firebaseKey: null,
    uid: getCurrentUserUid()
  });

  const handleClick = () => {
    setOpenForm((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    setPersonalCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPersonalCategoryData(personalCategory, user).then((response) => setCategory(response));
    setOpenForm(false);
    setPersonalCategory('');
  };

  return (
    <>
      <div><Button color='success' onClick={handleClick}>{openForm ? 'Close Form' : 'Add Category'}</Button></div>
      {openForm
        && <Form
        id="personalCategoryForm"
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>
          <FormGroup>
          <Label for="categoryName">Category</Label>
          <Input
            type="text"
            name="categoryName"
            id="categoryName"
            placeholder="Type Category"
            value={personalCategory.categoryName}
            onChange={handleInputChange}
          />
          </FormGroup>
          <Button color='danger'>Submit</Button>
        </Form>
      }
    </>
  );
}

CategoryForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  user: PropTypes.any,
  setCategory: PropTypes.func
};
