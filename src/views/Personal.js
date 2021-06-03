import React, { useState, useEffect } from 'react';
import {
  Card, CardLink, CardText, CardTitle
} from 'reactstrap';
import PersonalForm from '../components/PersonalForm';
import getPersonalCategoryData from '../helpers/data/categoryData';
import { getPersonalData } from '../helpers/data/personalData';

export default function Personal() {
  const [personalData, setPersonalData] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getPersonalData().then((response) => setPersonalData(response));
  }, []);

  useEffect(() => {
    getPersonalCategoryData().then((response) => setCategory(response));
  }, []);

  return (
    <section>
      <header>Personal Bookmark</header>
      <PersonalForm
        formTitle='Add new personal bookmark'
        personalData={personalData}
        setPersonalData={setPersonalData}
        category={category}
      />
      {personalData.map((personalCard) => (
        <Card key={personalCard.firebaseKey}>
          <CardTitle>{personalCard.title}</CardTitle>
          <CardLink href={personalCard.url} target='_blank'>{personalCard.url}</CardLink>
          <CardText>{personalCard.comments}</CardText>
        </Card>
      ))}
    </section>
  );
}
