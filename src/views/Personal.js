import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button, Input } from 'reactstrap';
import CategoryTable from '../components/Personal/CategoryTable';
import PersonalBookmarkCard from '../components/Personal/PersonalBookmarkCard';
import PersonalForm from '../components/Personal/PersonalForm';
import { getPersonalCategoryData } from '../helpers/data/categoryData';
import { getPersonalData, searchPersonalBookmark, searchPersonalCategory } from '../helpers/data/personalData';
import CategoryForm from '../components/Personal/CategoryForm';
import { CardStyle, HeadStyle, InputStyle } from '../styles/BookmarkStyle';

export default function Personal({ user }) {
  const [personalCards, setPersonalCards] = useState([]);
  const [category, setCategory] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPersonalData(user).then((response) => setPersonalCards(response));
    getPersonalCategoryData(user).then((response) => setCategory(response));
  }, []);

  const handleClick = (type) => {
    switch (type) {
      case 'display':
        setDisplayForm((prevState) => !prevState);
        break;
      case 'categorySearch':
        searchPersonalCategory(searchTerm, user).then((response) => setPersonalCards(response));
        break;
      case 'keywordSearch':
        searchPersonalBookmark(searchTerm, user).then((response) => setPersonalCards(response));
        break;
      default:
        console.warn('error');
    }
  };

  return (
    <section>
      <header className='m-2'><h1 className='openPersonalTitle'><i className="fas fa-bookmark fa-lg" id='titleBookmark'></i>Personal Bookmark</h1></header>
      <HeadStyle id='formSearchContainer'>
      <div>
          <motion.a whileHover={{ scale: 1.1 }} type='button' className='addBookmarkbtn' onClick={() => handleClick('display')}>{displayForm ? 'Close Form' : 'Add Bookmark'}</motion.a>
        {displayForm
          && <PersonalForm
          formTitle='Add Personal Bookmark'
          personalCards={personalCards}
          setPersonalCards={setPersonalCards}
          category={category}
          user={user}
          setDisplayForm={setDisplayForm}
          />
        }
        <CategoryForm
          formTitle='Add New Category'
          setCategory={setCategory}
          user={user}
        />
        </div>
        <div className='searchContainer'>
        <CategoryTable
        category={category} user={user} setCategory={setCategory}/>
        <InputStyle>
          <Input
            type='select'
            placeholder='Search Category'
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <option value=''>Search Category</option>
            {category.map((item) => (
              <option
                value={item.firebaseKey}
                key={item.firebaseKey}
              >{item.categoryName}</option>
            ))}
          </Input>
          <Button id='searchBtn' color='success' onClick={() => handleClick('categorySearch')}><i className="fas fa-search"></i></Button>
        </InputStyle>
        <InputStyle>
          <Input
            type='text'
            placeholder="Search Keywords"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button id='searchBtn' color='success' onClick={() => handleClick('keywordSearch')}><i className="fas fa-search"></i></Button>
          </InputStyle>
          </div>
      </HeadStyle>
      <CardStyle className='cardStyle'>
      {personalCards.map((personalCard) => (
        <PersonalBookmarkCard
          key={personalCard.firebaseKey}
          {...personalCard}
          setPersonalCards={setPersonalCards}
          user={user}
          category={category}
          setDisplayForm={setDisplayForm}
        />
      ))}
      </CardStyle>
    </section>
  );
}

Personal.propTypes = {
  user: PropTypes.any
};
