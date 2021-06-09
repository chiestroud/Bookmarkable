import React, { useState } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import PropTypes from 'prop-types';
import {
  Card, CardTitle, CardText, CardLink, Button
} from 'reactstrap';

export default function GoodRead({ goodReads }) {
  const [showResource, setShowResource] = useState(false);
  const [singleGoodRead, setSingleGoodRead] = useState([]);

  const handleClick = () => {
    setSingleGoodRead(goodReads[Math.floor(Math.random() * goodReads.length)]);
    setShowResource(true);
  };
  return (
    <Card className='homeCard'>
      <CardTitle className='randomCardTitle'>{showResource ? '' : 'Good Read'}</CardTitle>
        {showResource && <div>
          <CardText className='cardTitle'>{singleGoodRead.title}</CardText>
          <LinkPreview url={singleGoodRead.url} descriptionLength='80' imageHeight='130px'/>
          <CardLink src={singleGoodRead.url} target='_blank'>{singleGoodRead.url}</CardLink>
          </div>
        }
        <Button color='danger' onClick={() => handleClick('random')}>{!showResource ? 'Find' : 'Another Good Read'}</Button>
      </Card>
  );
}

GoodRead.propTypes = {
  goodReads: PropTypes.array
};
