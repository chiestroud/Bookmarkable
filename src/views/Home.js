import React from 'react';
import { motion } from 'framer-motion';
import Japanese from '../components/Home/Japanese';
import GoodRead from '../components/Home/GoodRead';
import GoodTutorial from '../components/Home/GoodTutorial';
import OtherResources from '../components/Home/OtherResources';

export default function Home() {
  return (
    <div>
      <motion.header
        className='title'
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
      >Welcome to Bookmarkable - JS Version</motion.header>
    <section className="home">
      <GoodTutorial />
      <GoodRead />
      <OtherResources />
      <Japanese />
    </section>
    </div>
  );
}
