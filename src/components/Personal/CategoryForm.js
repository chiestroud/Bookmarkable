import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { motion } from 'framer-motion';
import { getCurrentUserUid } from '../../helpers/data/userData';
import { addPersonalCategoryData } from '../../helpers/data/categoryData';
import { TitleStyle } from '../../styles/FormStyle';

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
      <div><motion.a type='button' whileHover={{ scale: 1.1 }} className='addCategoryBtn' color='success' onClick={handleClick}>{openForm ? 'Close Form' : 'Add Category'}</motion.a></div>
      {openForm
        && <Form
        id="form"
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TitleStyle>{formTitle}</TitleStyle>
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
          <div className='submitBtnContainer'><Button id='submitBtn'>Submit</Button></div>
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
