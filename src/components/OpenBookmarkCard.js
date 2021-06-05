import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardLink,
  CardText
} from 'reactstrap';

export default function OpenBookmarkCard({
  firebaseKey,
  title,
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

OpenBookmarkCard.propTypes = {
  firebaseKey: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  comments: PropTypes.string
};
