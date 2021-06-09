import React, { useEffect, useState } from 'react';
import {
  getGoodReads, getGoodTutorials, getJapaneseTrivia, getOtherResources
} from '../helpers/data/homeData';
import Japanese from '../components/Home/Japanese';
import GoodRead from '../components/Home/GoodRead';
import GoodTutorial from '../components/Home/GoodTutorial';
import OtherResources from '../components/Home/OtherResources';

export default function Home() {
  const [goodTutorials, setGoodTutorials] = useState([]);
  const [japaneseTrivia, setJapaneseTrivia] = useState([]);
  const [goodReads, setGoodReads] = useState([]);
  const [otherResources, setOtherResources] = useState([]);

  useEffect(() => {
    getGoodTutorials().then((resources) => setGoodTutorials(resources));
    getJapaneseTrivia().then((response) => setJapaneseTrivia(response));
    getGoodReads().then((response) => setGoodReads(response));
    getOtherResources().then((response) => setOtherResources(response));
  }, []);

  return (
    <>
    <header className='title'>Welcome to Bookmarkable - JS Version</header>
    <section className="home">
      <GoodTutorial goodTutorials={goodTutorials} />
      <GoodRead goodReads={goodReads} />
      <OtherResources otherResources={otherResources} />
      <Japanese japaneseTrivia={japaneseTrivia}/>
    </section>
    </>
  );
}
