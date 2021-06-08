import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardTitle, CardText, Button
} from 'reactstrap';

export default function Japanese({ japaneseTrivia }) {
  const [showResource, setShowResource] = useState(false);
  const [singleJapaneseResource, setSingleJapaneseResource] = useState([]);

  const handleClick = () => {
    setSingleJapaneseResource(japaneseTrivia[Math.floor(Math.random() * japaneseTrivia.length)]);
    setShowResource(true);
  };
  return (
    <Card className='homeCard'>
      <CardTitle className='randomCardTitle'>{showResource ? '' : 'Did you know? (Japanese words in English)'}</CardTitle>
      {showResource && <div>
        <CardText>{singleJapaneseResource.word}</CardText>
        <CardText>{singleJapaneseResource.comment}</CardText>
      </div>}
      <Button color='danger' onClick={handleClick}>{!showResource ? 'Find' : 'Another Japanese Word'}</Button>
    </Card>
  );
}

Japanese.propTypes = {
  japaneseTrivia: PropTypes.array
};
