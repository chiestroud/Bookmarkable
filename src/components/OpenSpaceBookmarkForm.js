import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { getCurrentUserUid } from '../helpers/data/userData';
import { addPublicBookmarks } from '../helpers/data/openSpaceData';

export default function OpenSpaceBookmarkForm({ publicCategory, setPublicBookmarks, formTitle }) {
  const [openForm, setOpenForm] = useState(false);
  const [publicBookmark, setPublicBookmark] = useState({
    firebaseKey: null,
    categoryId: '',
    title: '',
    url: '',
    comments: '',
    uid: getCurrentUserUid(),
    likes: 0
  });

  const handleClick = () => {
    setOpenForm((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    setPublicBookmark((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'publicCategory' ? e.target.selected : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPublicBookmarks().then((response) => setPublicBookmarks(response));
  };

  return (
    <>
      <Button onClick={handleClick}>{openForm ? 'Close Form' : 'Open Form'}</Button>
      {openForm
        ? <Form
          id='publicForm'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <h2>{formTitle}</h2>
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
        </Form> : ''}
    </>
  );
}

OpenSpaceBookmarkForm.propTypes = {
  user: PropTypes.any,
  publicCategory: PropTypes.array,
  setPublicCategory: PropTypes.func,
  setPublicBookmarks: PropTypes.func,
  formTitle: PropTypes.string
};
