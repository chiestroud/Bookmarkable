import React, { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import OpenBookmarkCard from '../components/OpenBookmarkCard';
import OpenSpaceBookmarkForm from '../components/OpenSpaceBookmarkForm';
import { getPublicBookmarks, searchPublicBookmarks, searchPublicCategory } from '../helpers/data/openSpaceData';
import getPublicCategoryData from '../helpers/data/publicCategoryData';
import { HeadStyle, InputStyle } from '../styles/OpenBookStyle';

export default function OpenSpace({ user }) {
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

  const handleClick = () => {
    setOpenForm((prevState) => !prevState);
  };

  const handleSearchClick = () => {
    searchPublicBookmarks(searchTerm).then((response) => setPublicBookmarks(response));
  };

  const handleCategorySearchClick = () => {
    searchPublicCategory(searchTerm).then((response) => setPublicBookmarks(response));
  };

  return (
    <section>
      <header>Open Space</header>
      <HeadStyle>
      <InputStyle>
          <Input
            type='select'
            placeholder="Select Category"
            onChange={(e) => setSearchTerm(e.target.value)}>
            <option value=''>Select</option>
            {publicCategory.map((item) => (
              <option
              value={item.firebaseKey}
              key={item.firebaseKey}
              >{item.categoryName}</option>
            ))}
          </Input>
          <Button color='success' onClick={handleCategorySearchClick}>Search</Button>
        </InputStyle>
        <InputStyle>
          <Input
            type='text'
            placeholder="Keyword search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button color='success' onClick={handleSearchClick}>Search</Button>
        </InputStyle>
      <div><Button onClick={handleClick}>{openForm ? 'Close Form' : 'Open Form'}</Button></div>
      {openForm && <OpenSpaceBookmarkForm
        formTitle='Add Public Bookmark'
        publicCategory={publicCategory}
        setPublicBookmarks={setPublicBookmarks}
        setOpenForm={setOpenForm}
        />}
      </HeadStyle>
      <div className='openBookmark'>
      {publicBookmarks.map((publicBookmark) => (
        <OpenBookmarkCard
          key={publicBookmark.firebaseKey}
          {...publicBookmark}
          user={user}
          publicCategory={publicCategory}
          setPublicBookmarks={setPublicBookmarks}
        />
      ))}
      </div>
    </section>
  );
}

OpenSpace.propTypes = {
  user: PropTypes.any
};
