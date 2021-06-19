import React, { useState } from 'react';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { TitleStyle } from '../../styles/FormStyle';
import { addJapaneseData, updateJapaneseData } from '../../helpers/data/japaneseApiData';

export default function JapaneseForm({
  formTitle,
  setJapaneseData,
  word,
  firebaseKey,
  url,
  comment,
  setOpenForm,
  setShowForm
}) {
  const [japaneseArray, setJapaneseArray] = useState({
    word: word || '',
    firebaseKey: firebaseKey || null,
    url: url || '',
    comment: comment || ''
  });

  const handleInputChange = (e) => {
    setJapaneseArray((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (japaneseArray.firebaseKey) {
      updateJapaneseData(japaneseArray).then((response) => setJapaneseData(response));
      setShowForm(false);
    } else {
      addJapaneseData(japaneseArray).then((response) => setJapaneseData(response));
      setOpenForm(false);
    }
  };

  return (
    <Form
      id='addJapanese'
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <TitleStyle>{formTitle}</TitleStyle>
      <FormGroup>
        <Label for="word">Japanese Word</Label>
        <Input
          type="text"
          name="word"
          placeholder="Japanese word"
          value={japaneseArray.word}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="url">Image</Label>
        <Input
          type="url"
          name="url"
          id="url"
          placeholder="Image Url"
          value={japaneseArray.url}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="comment">Comment</Label>
        <Input
          type="textarea"
          name="comment"
          id="comment"
          value={japaneseArray.comment}
          onChange={handleInputChange}
        />
      </FormGroup>
      <div className='submitBtnContainer'><Button color = 'success' id='submitJapaneseBtn'>Submit</Button></div>
    </Form>
  );
}

JapaneseForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setJapaneseData: PropTypes.func,
  word: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  comment: PropTypes.string,
  setOpenForm: PropTypes.func,
  setShowForm: PropTypes.func
};
