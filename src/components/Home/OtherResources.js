import React, { useState } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Card, CardTitle, CardText, CardLink, Button
} from 'reactstrap';

export default function OtherResources({ otherResources }) {
  const [showResource, setShowResource] = useState(false);
  const [singleOtherResource, setSingleOtherResource] = useState([]);

  const handleClick = () => {
    setSingleOtherResource(otherResources[Math.floor(Math.random() * otherResources.length)]);
    setShowResource(true);
  };

  return (
    <Card className='homeCard'>
      <CardTitle><motion.h2 className='randomCardTitle' whileHover={{ rotateZ: -45 }}>{showResource ? '' : 'Other Good Resource'}</motion.h2></CardTitle>
      {showResource && <div>
        <CardText className='cardTitle'>{singleOtherResource.title}</CardText>
        <LinkPreview url={singleOtherResource.url} descriptionLength='80' imageHeight='150px' height='270px' />
        <CardLink src={singleOtherResource.url} target='_blank'>{singleOtherResource.url}</CardLink>
      </div>
      }
      <Button id='goodResourceBtn' onClick={() => handleClick('random')}>{!showResource ? 'Find' : 'Another Good Resource'}</Button>
    </Card>
  );
}

OtherResources.propTypes = {
  otherResources: PropTypes.array
};
