import React, { useEffect, useState } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { motion } from 'framer-motion';
import {
  Card, CardTitle, CardLink, Button
} from 'reactstrap';
import sorry from '../../assets/sorry.jpg';
import { getGoodReads } from '../../helpers/data/homeData';

export default function GoodRead() {
  const [goodReads, setGoodReads] = useState([]);
  const [showResource, setShowResource] = useState(false);
  const [singleGoodRead, setSingleGoodRead] = useState([]);

  useEffect(() => {
    getGoodReads().then((response) => setGoodReads(response));
  }, []);

  const handleClick = () => {
    setSingleGoodRead(goodReads[Math.floor(Math.random() * goodReads.length)]);
    setShowResource(true);
  };
  return (
    <Card className='homeCard' id='goodRead'>
      <CardTitle>
        <motion.h2 className='randomCardTitle' whileHover={{ translateX: 50 }}>
          {showResource ? '' : 'Good Read'}
        </motion.h2>
      </CardTitle>
      {showResource
        && <div className='linkPreviewContainer'>
              <CardLink href={singleGoodRead.url} target='_blank'>
                <motion.p whileHover={{ scale: 1.1 }} className='cardTitle'>{singleGoodRead.title}</motion.p>
              </CardLink>
        <LinkPreview
          url={singleGoodRead.url}
          width='80%'
          descriptionLength='80'
          imageHeight='130px'
          height='80%'
          fallback={
            <div className='errorContainer'>
              <img width='200px' className='errorImage' src={sorry}/>
              <a href={singleGoodRead.url}>{singleGoodRead.url}</a>
              <p>Sorry no link preview available</p>
            </div>
          }
        />
            </div>
        }
        <Button id='goodReadBtn' onClick={() => handleClick('random')}>{!showResource ? 'Find' : 'Another Good Read'}</Button>
      </Card>
  );
}
