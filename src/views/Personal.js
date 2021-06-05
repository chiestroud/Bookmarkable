import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import PersonalBookmarkCard from '../components/PersonalBookmarkCard';
import PersonalForm from '../components/PersonalForm';
import { getPersonalCategoryData } from '../helpers/data/categoryData';
import { getPersonalData } from '../helpers/data/personalData';
import CategoryForm from '../components/CategoryForm';

export default function Personal({ user }) {
  const [personalCards, setPersonalCards] = useState([]);
  const [category, setCategory] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    if (user) {
      getPersonalData(user).then((response) => setPersonalCards(response));
    }
  }, []);

  useEffect(() => {
    if (user) {
      getPersonalCategoryData(user).then((response) => setCategory(response));
    }
  }, []);

  const handleClick = () => {
    setDisplayForm((prevState) => !prevState);
  };

  return (
    <section>
      <header>Personal Bookmark</header>
      <div className="formContainer">
        <Button onClick={handleClick}>{displayForm ? 'Close Form' : 'Add Bookmark'}</Button>
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
      <div className="cardContainer">
      {personalCards.map((personalCard) => (
        <PersonalBookmarkCard
          key={personalCard.firebaseKey}
          {...personalCard}
          setPersonalCards={setPersonalCards}
          user={user}
        />
      ))}
      </div>
    </section>
  );
}

Personal.propTypes = {
  user: PropTypes.any
};
