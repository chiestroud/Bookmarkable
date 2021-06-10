import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../helpers/data/userData';
import UserCards from '../components/UserCards';
import UserStyle from '../styles/AdminStyle';
import { getReportedPublicBookmarks } from '../helpers/data/openSpaceData';
import ReportedCards from '../components/Admin/ReportedCards';

export default function Admin({ user }) {
  const [users, setUsers] = useState([]);
  const [reportedPublicBookmarks, setReportedPublicBookmarks] = useState([]);

  if (user) {
    useEffect(() => {
      getUsers().then((returnedUsers) => setUsers(returnedUsers));
    }, []);
  }

  useEffect(() => {
    getReportedPublicBookmarks().then((response) => setReportedPublicBookmarks(response));
  }, []);

  return (
    <>
      <header><h1>Admin</h1></header>
      <h2>List of Bookmarkable Users</h2>
      <UserStyle>
        {users.map((person) => (
          <UserCards
            key={person.firebaseKey}
            {...person}
          />
        ))}
      </UserStyle>
      <h2>List of Reported Bookmarks</h2>
      {reportedPublicBookmarks.map((bookmark) => (
        <ReportedCards
          setReportedPublicBookmarks={setReportedPublicBookmarks}
          key={bookmark.firebaseKey}
          user={user}
          {...bookmark}
        />
      ))}
    </>
  );
}

Admin.propTypes = {
  user: PropTypes.any
};
