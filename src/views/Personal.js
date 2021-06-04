import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PersonalBookmarkCard from '../components/PersonalBookmarkCard';
import PersonalForm from '../components/PersonalForm';
import { getPersonalCategoryData } from '../helpers/data/categoryData';
import { getPersonalData } from '../helpers/data/personalData';
import CategoryForm from '../components/CategoryForm';

export default function Personal({ user }) {
  const [personalCards, setPersonalCards] = useState([]);
  const [category, setCategory] = useState([]);

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

  return (
    <section>
      <header>Personal Bookmark</header>
      <div className="formContainer">
      <PersonalForm
        formTitle='Add a new personal bookmark'
        personalCards={personalCards}
        setPersonalCards={setPersonalCards}
        category={category}
        user={user}
        />
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
        />
      ))}
      </div>
    </section>
  );
}

Personal.propTypes = {
  user: PropTypes.any
};
