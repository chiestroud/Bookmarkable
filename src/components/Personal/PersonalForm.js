import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import { addPersonalData, updatePersonalData } from '../../helpers/data/personalData';
import { getCurrentUserUid } from '../../helpers/data/userData';

export default function PersonalForm({
  formTitle,
  category,
  setPersonalCards,
  user,
  setDisplayForm,
  firebaseKey,
  comments,
  title,
  url,
  categoryId,
  setShowForm
}) {
  const [personalBookmark, setPersonalBookmark] = useState({
    firebaseKey: firebaseKey || null,
    categoryId: categoryId || '',
    comments: comments || '',
    title: title || '',
    uid: getCurrentUserUid(),
    url: url || '',
  });

  const handleInputChange = (e) => {
    setPersonalBookmark((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'categoryId' ? e.target.selected : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (personalBookmark.firebaseKey) {
      updatePersonalData(personalBookmark, user).then((bookmarkArray) => setPersonalCards(bookmarkArray));
      setShowForm(false);
    } else {
      addPersonalData(personalBookmark, user).then((response) => setPersonalCards(response));
      setDisplayForm(false);
    }
  };

  return (
    <Form
        id="form"
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="title">Resource Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            value={personalBookmark.title}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="url">Resource URL</Label>
          <Input
            type="url"
            name="url"
            id="url"
            placeholder="Enter URL"
            value={personalBookmark.url}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="comments">Comment</Label>
          <Input
            type="textarea"
            name="comments"
            id="comments"
            value={personalBookmark.comments}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="categoryId">Select</Label>
          <Input
            type="select"
            name="categoryId"
            id="categoryId"
            value={personalBookmark.categoryId}
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
        <div className='submitBtnContainer'><Button id='submitBtn'>Submit</Button></div>
      </Form>
  );
}

PersonalForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  category: PropTypes.array,
  setPersonalCards: PropTypes.func,
  user: PropTypes.any,
  setDisplayForm: PropTypes.func,
  firebaseKey: PropTypes.string,
  comments: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  categoryId: PropTypes.string,
  setShowForm: PropTypes.func
};
