import React from 'react';
import PropTypes from 'prop-types';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import {
  Card, CardTitle, CardText, CardLink, Button
} from 'reactstrap';
import { deleteReportedPublicBookmark, updateReportedPublicBookmark } from '../../helpers/data/openSpaceData';

export default function ReportedCards({
  title,
  url,
  comments,
  firebaseKey,
  setReportedPublicBookmarks
}) {
  const handleReport = () => {
    const obj = {
      firebaseKey,
      reported: false
    };
    updateReportedPublicBookmark(obj).then((response) => setReportedPublicBookmarks(response));
  };
  const handleDelete = () => {
    deleteReportedPublicBookmark(firebaseKey).then((response) => setReportedPublicBookmarks(response));
  };

  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <div><LinkPreview url={url} descriptionLength='50' imageHeight='150px' /></div>
      <CardLink href={url} target='_blank'>{url}</CardLink>
      <CardText>{comments}</CardText>
      <div><Button color='warning' onClick={handleReport}>WHAT IS WRONG WITH THIS BOOKMARK?</Button>
      <Button color='danger' onClick={handleDelete}>Delete</Button></div>
    </Card>
  );
}

ReportedCards.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  comments: PropTypes.string,
  firebaseKey: PropTypes.string,
  setReportedPublicBookmarks: PropTypes.func
};
