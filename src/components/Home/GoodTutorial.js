import React, { useEffect, useState } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { motion } from 'framer-motion';
import {
  Card, CardTitle, CardText, CardLink, Button
} from 'reactstrap';
import sorry from '../../assets/sorry.jpg';
import { getGoodTutorials } from '../../helpers/data/homeData';

export default function GoodTutorial() {
  const [goodTutorials, setGoodTutorials] = useState([]);
  const [showResource, setShowResource] = useState(false);
  const [singleGoodTutorial, setSingleGoodTutorial] = useState([]);

  useEffect(() => {
    getGoodTutorials().then((resources) => setGoodTutorials(resources));
  }, []);

  const handleClick = () => {
    setSingleGoodTutorial(goodTutorials[Math.floor(Math.random() * goodTutorials.length)]);
    setShowResource(true);
  };
  return (
    <Card className='homeCard'>
      <CardTitle>
        <motion.h2 className='randomCardTitle' whileHover={{ rotateZ: 15 }}>
          {showResource ? '' : 'Good Tutorial'}
        </motion.h2>
      </CardTitle>
      {showResource && <div className='linkPreviewContainer'>
        <CardText className='cardTitle'>
          <CardLink href={singleGoodTutorial.url} target='_blank'>
            <motion.p whileHover={{ scale: 1.1 }}>
              {singleGoodTutorial.title}
            </motion.p>
          </CardLink>
        </CardText>
        <LinkPreview
          url={singleGoodTutorial.url}
          width='90%' descriptionLength='80'
          imageHeight='130px'
          height='80%'
          fallback={
            <div className='errorContainer'>
              <img width='200px' className='errorImage' src={sorry}/>
              <a href={singleGoodTutorial.url}>{singleGoodTutorial.url}</a>
              <p>Sorry no link preview available</p>
            </div>
          } />
      </div>
      }
      <Button id='goodTutorialBtn' onClick={() => handleClick('random')}>{!showResource ? 'Find' : 'Another Good Tutorial'}</Button>
    </Card>
  );
}
