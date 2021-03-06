import React, { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import OpenBookmarkCard from '../components/OpenSpace/OpenBookmarkCard';
import OpenSpaceBookmarkForm from '../components/OpenSpace/OpenSpaceBookmarkForm';
import { getPublicBookmarks, searchPublicBookmarks, searchPublicCategory } from '../helpers/data/openSpaceData';
import { getPublicCategoryData } from '../helpers/data/publicCategoryData';
import { CardStyle, HeadStyle, InputStyle } from '../styles/BookmarkStyle';

export default function OpenSpace({ user, admin }) {
  const [publicBookmarks, setPublicBookmarks] = useState([]);
  const [publicCategory, setPublicCategory] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPublicBookmarks().then((response) => setPublicBookmarks(response));
  }, []);

  useEffect(() => {
    getPublicCategoryData().then((response) => setPublicCategory(response));
  }, []);

  const handleClick = (type) => {
    switch (type) {
      case 'openForm':
        setOpenForm((prevState) => !prevState);
        break;
      case 'categorySearch':
        searchPublicCategory(searchTerm).then((response) => setPublicBookmarks(response));
        break;
      case 'keywordSearch':
        searchPublicBookmarks(searchTerm).then((response) => setPublicBookmarks(response));
        break;
      default:
        console.warn('error');
    }
  };

  return (
    <section>
      <header className='m-2'>
        <h1 className='openPersonalTitle'><i className="fas fa-bookmark fa-lg" id='titleBookmark'></i>Open Space</h1>
      </header>
      <HeadStyle id='formSearchContainer'>
        <div>
          <motion.a
            whileHover={{ scale: 1.1 }}
            type='button'
            className='addBookmarkBtn'
            onClick={() => handleClick('openForm')}
          ><i className="fas fa-bookmark mr-2"></i>{openForm ? 'Close Form' : 'Add Bookmark'}</motion.a>
          {openForm && <OpenSpaceBookmarkForm
            formTitle='Add Public Bookmark'
            publicCategory={publicCategory}
            setPublicBookmarks={setPublicBookmarks}
            setOpenForm={setOpenForm}
          />}
        </div>
        <div className='searchContainer'>
          <InputStyle>
            <Input
              type='select'
              placeholder="Search Category"
              onChange={(e) => setSearchTerm(e.target.value)}>
              <option value=''>Search by Category</option>
              {publicCategory.map((item) => (
                <option
                value={item.firebaseKey}
                key={item.firebaseKey}
                >{item.categoryName}</option>
              ))}
            </Input>
            <Button id='searchBtn'onClick={() => handleClick('categorySearch')}><i className="fas fa-search"></i></Button>
          </InputStyle>
          <InputStyle>
            <Input
              type='text'
              placeholder='Search Keywords'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button id='searchBtn' color='success' onClick={() => handleClick('keywordSearch')}><i className="fas fa-search"></i></Button>
          </InputStyle>
        </div>
      </HeadStyle>
      <CardStyle className='cardStyle'>
      {publicBookmarks.reverse().map((publicBookmark) => (
        <OpenBookmarkCard
          key={publicBookmark.firebaseKey}
          {...publicBookmark}
          user={user}
          admin={admin}
          setOpenForm={setOpenForm}
          publicCategory={publicCategory}
          publicBookmarks={publicBookmarks}
          setPublicBookmarks={setPublicBookmarks}
        />
      ))}
      </CardStyle>
    </section>
  );
}

OpenSpace.propTypes = {
  user: PropTypes.any,
  admin: PropTypes.any
};
