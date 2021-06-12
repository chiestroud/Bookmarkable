import React from 'react';
import PropTypes from 'prop-types';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import {
  Card, CardTitle, CardText, CardLink, Button
} from 'reactstrap';
import { deleteReportedPublicBookmark, updateReportedPublicBookmark } from '../../helpers/data/openSpaceData';
import { ButtonStyle, IndividualCardStyle } from '../../styles/BookmarkStyle';

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
    <IndividualCardStyle>
      <Card>
        <CardTitle>{title}</CardTitle>
        <div>
          <LinkPreview url={url} descriptionLength='50' imageHeight='150px' height='300px' />
        </div>
        <CardLink href={url} target='_blank'>{url}</CardLink>
        <CardText>{comments}</CardText>
        <ButtonStyle>
          <Button color='warning' className='mr-2' onClick={handleReport}>TOTALLY APPROPRIATE</Button>
          <Button color='danger' onClick={handleDelete}>GOODBYE</Button>
        </ButtonStyle>
      </Card>
    </IndividualCardStyle>
  );
}

ReportedCards.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  comments: PropTypes.string,
  firebaseKey: PropTypes.string,
  setReportedPublicBookmarks: PropTypes.func
};
