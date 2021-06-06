import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import { getPersonalCategoryData } from '../helpers/data/categoryData';
import { getCurrentUserUid } from '../helpers/data/userData';
import { addPersonalData } from '../helpers/data/personalData';

export default function BookmarkForm({
  user,
  firebaseKey,
  categoryId,
  comments,
  title,
  url,
  setShowCategory
}) {
  const [category, setCategory] = useState([]);
  const [bookmarkPublicBookmark, setBookmarkPublicBookmark] = useState({
    firebaseKey: firebaseKey || null,
    categoryId: categoryId || '',
    comments: comments || '',
    title: title || '',
    uid: getCurrentUserUid(),
    url: url || '',
  });

  if (user) {
    useEffect(() => {
      getPersonalCategoryData(user).then((response) => setCategory(response));
    }, []);
  }

  const handleInputChange = (e) => {
    setBookmarkPublicBookmark((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'categoryId' ? e.target.selected : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPersonalData(bookmarkPublicBookmark, user).then((response) => setBookmarkPublicBookmark(response));
    setShowCategory(false);
  };

  return (
      <Form id='form' onSubmit={handleSubmit}>
      <FormGroup className='formContainer'>
        <Label for="categoryId">Category</Label>
          <Input
            type="select"
            name="categoryId"
            id="category"
            value={category.categoryId}
            onChange={handleInputChange}
          >
            <option value=''>Select Category</option>
            {category.map((item) => (
              <option
                value={item.firebaseKey}
                key={item.firebaseKey}
              >{item.categoryName}</option>
            ))}
          </Input>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

BookmarkForm.propTypes = {
  user: PropTypes.any,
  firebaseKey: PropTypes.string,
  categoryId: PropTypes.string,
  comments: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  setShowCategory: PropTypes.func
};
