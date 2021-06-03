import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import { addPersonalData } from '../helpers/data/personalData';
import { getCurrentUserUid } from '../helpers/data/userData';

export default function PersonalForm({ formTitle, category, setPersonalData }) {
  const [displayForm, setDisplayForm] = useState(false);
  const [personalBookmark, setPersonalBookmark] = useState({
    firebaseKey: null,
    categoryId: '',
    comments: '',
    title: '',
    uid: getCurrentUserUid(),
    url: ''
  });

  const handleClick = () => {
    setDisplayForm((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    setPersonalBookmark((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'category' ? e.target.selected : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPersonalData(personalBookmark).then((response) => setPersonalData(response));
    setDisplayForm(false);
  };

  return (
    <>
    <Button onClick={handleClick}>{displayForm ? 'Close Form' : 'Add Bookmark'}</Button>
      {displayForm ? <Form
        id="personalForm"
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
        <Button>Submit</Button>
      </Form> : ''}
      </>
  );
}

PersonalForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  category: PropTypes.array,
  setPersonalData: PropTypes.func
};
