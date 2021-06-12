import React, { useState } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import PropTypes from 'prop-types';
import {
  Card, CardTitle, CardText, CardLink, Button
} from 'reactstrap';

export default function GoodTutorial({ goodTutorials }) {
  const [showResource, setShowResource] = useState(false);
  const [singleGoodTutorial, setSingleGoodTutorial] = useState([]);

  const handleClick = () => {
    setSingleGoodTutorial(goodTutorials[Math.floor(Math.random() * goodTutorials.length)]);
    setShowResource(true);
  };
  return (
    <Card className='homeCard'>
      <CardTitle className='randomCardTitle'>{showResource ? '' : 'Good Tutorial'}</CardTitle>
      {showResource && <div>
        <CardText className='cardTitle'>{singleGoodTutorial.title}</CardText>
        <LinkPreview url={singleGoodTutorial.url} descriptionLength='80' imageHeight='130px' height='70%'/>
        <CardLink src={singleGoodTutorial.url} target='_blank'>{singleGoodTutorial.url}</CardLink>
      </div>
      }
      <Button color='danger' onClick={() => handleClick('random')}>{!showResource ? 'Find' : 'Another Good Tutorial'}</Button>
    </Card>
  );
}

GoodTutorial.propTypes = {
  goodTutorials: PropTypes.array
};
