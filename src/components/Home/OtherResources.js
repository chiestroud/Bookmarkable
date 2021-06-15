import React, { useState, useEffect } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { motion } from 'framer-motion';
import {
  Card, CardTitle, CardText, CardLink, Button
} from 'reactstrap';
import { getOtherResources } from '../../helpers/data/homeData';

export default function OtherResources() {
  const [showResource, setShowResource] = useState(false);
  const [singleOtherResource, setSingleOtherResource] = useState([]);
  const [otherResources, setOtherResources] = useState([]);

  useEffect(() => {
    getOtherResources().then((response) => setOtherResources(response));
  }, []);

  const handleClick = () => {
    setSingleOtherResource(otherResources[Math.floor(Math.random() * otherResources.length)]);
    setShowResource(true);
  };

  return (
    <Card className='homeCard'>
      <CardTitle>
        <motion.h2 className='randomCardTitle' whileHover={{ rotateZ: -15 }}>
          {showResource ? '' : 'Other Good Resource'}
        </motion.h2>
      </CardTitle>
      {showResource
        && <div className='linkPreviewContainer'>
              <CardText className='cardTitle'><CardLink href={singleOtherResource.url} target='_blank'><motion.p whileHover={{ scale: 1.1 }}>{singleOtherResource.title}</motion.p></CardLink></CardText>
              <LinkPreview url={singleOtherResource.url} descriptionLength='80' imageHeight='150px' height='270px' />
            </div>
      }
      <Button id='goodResourceBtn' onClick={() => handleClick('random')}>{!showResource ? 'Find' : 'Another Good Resource'}</Button>
    </Card>
  );
}
