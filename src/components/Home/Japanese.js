import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Card, CardTitle, CardText, Button, CardImg
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
      <CardTitle><motion.h2 className='randomCardTitle' whileHover={{ translateX: -45 }}>{showResource ? '' : 'Did you know? (Japanese words in English)'}</motion.h2></CardTitle>
      {showResource && <div>
        <CardText className='cardTitle'>{singleJapaneseResource.word}</CardText>
        <CardImg className='japaneseImage' src={singleJapaneseResource.url} alt="{singleJapaneseResource.word}" />
        <CardText>{singleJapaneseResource.comment}</CardText>
      </div>}
      <Button id='randomJapaneseBtn' onClick={handleClick}>{!showResource ? 'Find' : 'Another Japanese Word'}</Button>
    </Card>
  );
}

Japanese.propTypes = {
  japaneseTrivia: PropTypes.array
};
