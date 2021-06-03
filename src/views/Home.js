import React, { useEffect, useState } from 'react';
import {
  Card, CardTitle, Button, CardText, CardLink
} from 'reactstrap';
import getPublicBookmarks from '../helpers/data/openSpaceData';

export default function Home() {
  const [randomResources, setRandomResources] = useState([]);
  const [singleResource, setSingleResource] = useState([]);
  const [showResource, setShowResource] = useState(false);

  useEffect(() => {
    getPublicBookmarks().then((resources) => setRandomResources(resources));
  }, []);

  const handleClick = () => {
    setSingleResource(randomResources[Math.floor(Math.random() * randomResources.length)]);
    setShowResource(true);
  };

  return (
    <section className="home">
      <header>Welcome to Bookmarkable</header>
      <Card className='homeCard'>
        <CardTitle>JavaScript Resource of the Day</CardTitle>
        {showResource && <div>
          <CardText>{singleResource.title}</CardText>
          <CardLink src={singleResource.url} target='_blank'>{singleResource.url}</CardLink>
          </div>
        }
        <Button onClick={handleClick}>{!showResource ? 'Find' : 'Another Resource'}</Button>
      </Card>
    </section>
  );
}
