import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card, CardTitle, CardText, Button, CardImg
} from 'reactstrap';
import { getJapaneseTrivia } from '../../helpers/data/homeData';

export default function Japanese() {
  const [japaneseTrivia, setJapaneseTrivia] = useState([]);
  const [showResource, setShowResource] = useState(false);
  const [singleJapaneseResource, setSingleJapaneseResource] = useState([]);

  useEffect(() => {
    getJapaneseTrivia().then((response) => setJapaneseTrivia(response));
  }, []);

  const handleClick = () => {
    setSingleJapaneseResource(japaneseTrivia[Math.floor(Math.random() * japaneseTrivia.length)]);
    setShowResource(true);
  };
  return (
    <Card className='homeCard'>
      <CardTitle>
        <motion.h2 className='randomCardTitle' whileHover={{ translateX: -50 }}>
          {showResource ? '' : 'Did you know?'}
        </motion.h2>
      </CardTitle>
      {showResource && <div className='linkPreviewContainer'>
        <CardText className='cardTitle'>{singleJapaneseResource.word}</CardText>
        <CardImg className='japaneseImage' src={singleJapaneseResource.url} alt="{singleJapaneseResource.word}" />
        <CardText className='japaneseComment'>{singleJapaneseResource.comment}</CardText>
      </div>}
      <Button id='randomJapaneseBtn' onClick={handleClick}>{!showResource ? 'Find' : 'Another Japanese Word'}</Button>
    </Card>
  );
}
