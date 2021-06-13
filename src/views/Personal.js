import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

  if (user) {
    useEffect(() => {
      getPersonalData(user).then((response) => setPersonalCards(response));
    }, []);
  }

  if (user) {
    useEffect(() => {
      getPersonalCategoryData(user).then((response) => setCategory(response));
    }, []);
  }

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
      <header className='m-2'><h1><i className="fas fa-bookmark fa-lg" id='titleBookmark'></i>Personal Bookmark</h1></header>
      <HeadStyle>
      <div>
        <a type='button' className='addBookmarkbtn' onClick={() => handleClick('display')}>{displayForm ? 'Close Form' : 'Add Bookmark'}</a>
        {displayForm
          && <PersonalForm
          formTitle='Add a new personal bookmark'
          personalCards={personalCards}
          setPersonalCards={setPersonalCards}
          category={category}
          user={user}
          setDisplayForm={setDisplayForm}
          />
        }
        <CategoryForm
          formTitle='Add a new category'
          setCategory={setCategory}
          user={user}
        />
        </div>
        <div>
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
          <Button color='success' onClick={() => handleClick('categorySearch')}><i className="fas fa-search"></i></Button>
        </InputStyle>
        <InputStyle>
          <Input
            type='text'
            placeholder="Search Keywords"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button color='success' onClick={() => handleClick('keywordSearch')}><i className="fas fa-search"></i></Button>
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
