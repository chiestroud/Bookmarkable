import React from 'react';
import {
  Card,
  CardText, CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

export default function UserCards({
  displayName,
  photoURL,
  email
}) {
  return (
    <Card className='userCards'>
      <CardTitle>{displayName}<span><img className='profileImage ml-3' src={photoURL} /></span></CardTitle>
      <CardText>{email}</CardText>
    </Card>
  );
}

UserCards.propTypes = {
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};
