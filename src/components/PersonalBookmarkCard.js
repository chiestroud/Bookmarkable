import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardTitle, CardLink, CardText
} from 'reactstrap';

export default function PersonalBookmarkCard({
  title,
  firebaseKey,
  url,
  comments
}) {
  return (
    <Card key={firebaseKey}>
      <CardTitle>{title}</CardTitle>
      <CardLink href={url} target='_blank'>{url}</CardLink>
      <CardText>{comments}</CardText>
    </Card>
  );
}

PersonalBookmarkCard.propTypes = {
  title: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired
};
