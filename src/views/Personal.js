import React, { useState, useEffect } from 'react';
import {
  Card, CardLink, CardText, CardTitle
} from 'reactstrap';
import getPersonalData from '../helpers/data/personalData';

export default function Personal() {
  const [personalData, setPersonalData] = useState([]);

  useEffect(() => {
    getPersonalData().then((response) => setPersonalData(response));
  }, []);

  return (
    <section>
      <header>Personal Bookmark</header>
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
