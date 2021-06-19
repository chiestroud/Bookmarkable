import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardTitle, CardText, CardImg, Button
} from 'reactstrap';
import JapaneseForm from './JapaneseForm';
import { deleteJapaneseData } from '../../helpers/data/japaneseApiData';

export default function JapaneseAPI({
  firebaseKey,
  word,
  comment,
  url,
  setJapaneseData,
}) {
  const [showForm, setShowForm] = useState(false);
  const handleClick = (type) => {
    if (type === 'edit') {
      setShowForm((prevState) => !prevState);
    } else if (type === 'delete') {
      deleteJapaneseData(firebaseKey).then((response) => setJapaneseData(response));
    }
  };
  return (
    <Card key={firebaseKey} id='japaneseCards'>
      <CardTitle className='wordTitle'>{word}</CardTitle>
      <CardImg className='japaneseCardsImage' src={url} alt={word} />
      <CardText>{comment}</CardText>
      <div className='openCardEditDelete'>
        <Button id='editJapaneseBtn' className='editBtn' onClick={() => handleClick('edit')}><i className="far fa-edit mr-1"></i>{showForm ? 'Close' : 'Edit'}</Button>
        <Button id='deleteJapaneseBtn' onClick={() => handleClick('delete')}><i className="far fa-trash-alt mr-1"></i>Delete</Button>
      </div>
      {showForm
        && <JapaneseForm
        formTitle='Edit Words'
        firebaseKey={firebaseKey}
        word={word}
        comment={comment}
        url={url}
        setJapaneseData={setJapaneseData}
        setShowForm={setShowForm}
      />
      }
    </Card>
  );
}

JapaneseAPI.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setJapaneseData: PropTypes.func
};
