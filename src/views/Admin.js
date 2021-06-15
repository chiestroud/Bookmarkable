import React, { useEffect, useState } from 'react';
import { getUsers } from '../helpers/data/userData';
import UserCards from '../components/Admin/UserCards';
import { getReportedPublicBookmarks } from '../helpers/data/openSpaceData';
import ReportedCards from '../components/Admin/ReportedCards';
import AddCategoryForm from '../components/Admin/AddCategoryForm';
import { CardStyle } from '../styles/BookmarkStyle';
import { getPublicCategoryData } from '../helpers/data/publicCategoryData';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [reportedPublicBookmarks, setReportedPublicBookmarks] = useState([]);
  const [openCategory, setOpenCategory] = useState([]);

  useEffect(() => {
    getUsers().then((returnedUsers) => setUsers(returnedUsers));
    getPublicCategoryData().then((returnedCategory) => setOpenCategory(returnedCategory));
    getReportedPublicBookmarks().then((response) => setReportedPublicBookmarks(response));
  }, []);

  return (
    <>
      <header className='m-2'>
        <h1 className='openPersonalTitle'><i className="fas fa-bookmark fa-lg" id='titleBookmark'></i>Admin</h1>
      </header>
      <div id='adminPage'>
        <AddCategoryForm
          formTitle='Add Public Category'
          setOpenCategory={setOpenCategory}
          openCategory={openCategory}
        />
        <h2>List of Bookmarkable Users</h2>
        <div id='adminUserCards'>
          {users.map((person) => (
            <UserCards
              key={person.firebaseKey}
              {...person}
            />
          ))}
        </div>
        <h2>List of Reported Bookmarks</h2>
        <CardStyle>
          {reportedPublicBookmarks.map((bookmark) => (
            <ReportedCards
              setReportedPublicBookmarks={setReportedPublicBookmarks}
              key={bookmark.firebaseKey}
              {...bookmark}
            />
          ))}
        </CardStyle>
      </div>
    </>
  );
}
