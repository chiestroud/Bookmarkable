import React, { useState } from 'react';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { TitleStyle } from '../../styles/FormStyle';
import { addPublicCategoryData } from '../../helpers/data/publicCategoryData';

export default function AddCategoryForm({ formTitle, setOpenCategory }) {
  const [openForm, setOpenForm] = useState(false);
  const [publicCategoryData, setPublicCategoryData] = useState({
    categoryName: '',
    firebaseKey: null,
  });

  const handleInputChange = (e) => {
    setPublicCategoryData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClick = () => {
    setOpenForm((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPublicCategoryData(publicCategoryData).then((response) => setOpenCategory(response));
    setOpenForm(false);
    setPublicCategoryData({ categoryName: '' });
  };

  return (
    <>
      <div><motion.a whileHover={{ scale: 1.1 }} type='button' className='add' onClick={() => handleClick('openForm')}>{openForm ? 'Close Form' : 'Add New Public Category'}</motion.a></div>
      {openForm
        && <Form
              id="adminForm"
              autoComplete='off'
              onSubmit={handleSubmit}
              className='categoryCreateForm'
            >
            <TitleStyle>{formTitle}</TitleStyle>
            <FormGroup>
              <Label for="categoryName">Category</Label>
              <Input
                type="text"
                name="categoryName"
                id="categoryName"
                placeholder="Type Category"
                value={publicCategoryData.categoryName}
                onChange={handleInputChange}
              />
            </FormGroup>
            <div className='submitBtnContainer'><Button id='submitBtn'>Submit</Button></div>
          </Form>
      }
    </>
  );
}

AddCategoryForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setOpenCategory: PropTypes.func
};
