import React, { useState, useEffect } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { motion } from 'framer-motion';
import {
  Card, CardTitle, CardLink, Button
} from 'reactstrap';
import sorry from '../../assets/sorry.jpg';
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
        <motion.h2 className='randomCardTitle' whileHover={{ rotateZ: -30 }}>
          {showResource ? '' : 'Other Good Resource'}
        </motion.h2>
      </CardTitle>
      {showResource
        && <div className='linkPreviewContainer'>
            <CardLink href={singleOtherResource.url} target='_blank'>
              <motion.p whileHover={{ scale: 1.1 }} className='cardTitle'>{singleOtherResource.title}</motion.p>
            </CardLink>
          <LinkPreview
          url={singleOtherResource.url}
          descriptionLength='80'
          imageHeight='150px'
          height='80%'
          fallback={
            <div className='errorContainer'>
              <img width='200px' className='errorImage' src={sorry}/>
              <a href={singleOtherResource.url}>{singleOtherResource.url}</a>
              <p>Sorry no link preview available</p>
            </div>
          }
        />
            </div>
      }
      <Button id='goodResourceBtn' onClick={() => handleClick('random')}>{!showResource ? 'Find' : 'Another Good Resource'}</Button>
    </Card>
  );
}
