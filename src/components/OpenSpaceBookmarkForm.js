import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { getCurrentUserUid } from '../helpers/data/userData';
import { addPublicBookmarks, updatePublicBookmark } from '../helpers/data/openSpaceData';
import { TitleStyle } from '../styles/FormStyle';

export default function OpenSpaceBookmarkForm({
  publicCategory,
  firebaseKey,
  setPublicBookmarks,
  formTitle,
  setOpenForm,
  title,
  url,
  comments,
  categoryId,
  likes,
  setShowForm
}) {
  const [publicBookmark, setPublicBookmark] = useState({
    firebaseKey: firebaseKey || '',
    categoryId: categoryId || '',
    title: title || '',
    url: url || '',
    comments: comments || '',
    uid: getCurrentUserUid(),
    likes: likes || 0
  });

  const handleInputChange = (e) => {
    setPublicBookmark((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'publicCategory' ? e.target.selected : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (publicBookmark.firebaseKey) {
      updatePublicBookmark(publicBookmark).then((response) => setPublicBookmarks(response));
      setShowForm(false);
    } else {
      addPublicBookmarks(publicBookmark).then((response) => setPublicBookmarks(response));
      setOpenForm(false);
      setPublicBookmark('');
    }
  };

  return (
    <Form
      id='form'
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <TitleStyle>{formTitle}</TitleStyle>
      <FormGroup>
        <Label for="title">Resource Title</Label>
        <Input
          type="text"
          name="title" id="title"
          placeholder="Title of the Resource"
          value={publicBookmark.title}
          onChange={handleInputChange}
        />
        </FormGroup>
        <FormGroup>
          <Label for="url">Link to the Resource</Label>
          <Input
            type="url"
            name="url"
            id="url"
            placeholder="Link to the Resource"
            value={publicBookmark.url}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="publicCategory">Category</Label>
          <Input
            type="select"
            name="categoryId"
            id="publicCategory"
            value={publicBookmark.categoryId}
            onChange={handleInputChange}
          >
            <option value=''>Select Category</option>
            {publicCategory.map((item) => (
              <option
                value={item.firebaseKey}
                key={item.firebaseKey}
              >{item.categoryName}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="commentss">Comment</Label>
          <Input
            type="textarea"
            name="comments"
            id="publicComments"
            placeholder="Comments"
            value={publicBookmark.comments}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
  );
}

OpenSpaceBookmarkForm.propTypes = {
  user: PropTypes.any,
  publicCategory: PropTypes.array,
  setPublicCategory: PropTypes.func,
  setPublicBookmarks: PropTypes.func,
  formTitle: PropTypes.string,
  setOpenForm: PropTypes.func,
  firebaseKey: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  comments: PropTypes.string,
  likes: PropTypes.number,
  uid: PropTypes.string,
  categoryId: PropTypes.string,
  setShowForm: PropTypes.func
};
