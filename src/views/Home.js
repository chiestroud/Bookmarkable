import React, { useEffect, useState } from 'react';
import {
  Card, CardTitle, Button, CardText, CardLink
} from 'reactstrap';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { getPublicBookmarks } from '../helpers/data/openSpaceData';

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
      <header className='title'>Welcome to Bookmarkable - JS Version</header>
      <Card className='homeCard'>
        <CardTitle>JavaScript Resource of the Day</CardTitle>
        {showResource && <div>
          <CardText>{singleResource.title}</CardText>
          <CardText><LinkPreview url={singleResource.url} descriptionLength='100' imageHeight='200px'/></CardText>
          <CardLink src={singleResource.url} target='_blank'>{singleResource.url}</CardLink>
          </div>
        }
        <Button color='danger' onClick={handleClick}>{!showResource ? 'Find' : 'Another Resource'}</Button>
      </Card>
    </section>
  );
}
