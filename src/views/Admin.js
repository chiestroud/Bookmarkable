import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getUsers } from '../helpers/data/userData';
import UserCards from '../components/Admin/UserCards';
import { getReportedPublicBookmarks } from '../helpers/data/openSpaceData';
import ReportedCards from '../components/Admin/ReportedCards';
import AddCategoryForm from '../components/Admin/AddCategoryForm';
import { CardStyle } from '../styles/BookmarkStyle';
import { getPublicCategoryData } from '../helpers/data/publicCategoryData';
import PublicCategoryTable from '../components/Admin/PublicCategoryTable';
import JapaneseAPI from '../components/Admin/JapaneseAPI';
import JapaneseForm from '../components/Admin/JapaneseForm';
import { getJapaneseData } from '../helpers/data/japaneseApiData';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [reportedPublicBookmarks, setReportedPublicBookmarks] = useState([]);
  const [openCategory, setOpenCategory] = useState([]);
  const [japaneseData, setJapaneseData] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    getUsers().then((returnedUsers) => setUsers(returnedUsers));
    getPublicCategoryData().then((returnedCategory) => setOpenCategory(returnedCategory));
    getReportedPublicBookmarks().then((response) => setReportedPublicBookmarks(response));
    getJapaneseData().then((response) => setJapaneseData(response));
  }, []);

  const handleClick = () => {
    setOpenForm((prevState) => !prevState);
  };

  return (
    <div className='adminPage'>
      <header className='m-2'>
        <h1 className='openPersonalTitle'><i className="fas fa-bookmark fa-lg" id='titleBookmark'></i>Admin</h1>
      </header>
      <div id='adminPage'>
        <div className='adminCategory'>
          <AddCategoryForm
            formTitle='Add Public Category'
            setOpenCategory={setOpenCategory}
            openCategory={openCategory}
          />
          <PublicCategoryTable
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
          />
        </div>
        <h2>Bookmarkable Users</h2>
        <div id='adminUserCards'>
          {users.map((person) => (
            <UserCards
              key={person.firebaseKey}
              {...person}
            />
          ))}
        </div>
        <h2>Reported Bookmarks</h2>
        <CardStyle>
          {reportedPublicBookmarks.map((bookmark) => (
            <ReportedCards
              setReportedPublicBookmarks={setReportedPublicBookmarks}
              key={bookmark.firebaseKey}
              {...bookmark}
            />
          ))}
        </CardStyle>
        <h2>Japanese/English words</h2>
        <div>
        <motion.a
          whileHover={{ scale: 1.1 }}
          type='button' className='add'
          onClick={() => handleClick('openForm')}
        ><i className="far fa-address-book mr-1"></i>{openForm ? 'Close Form' : 'Add New Japanese Words'}
        </motion.a>
        </div>
        {openForm
          && <JapaneseForm
          formTitle='Add New Japanese Word'
          setJapaneseData={setJapaneseData}
          setOpenForm={setOpenForm}
        />}
        <div className='adminJapaneseCards'>
          {japaneseData.map((data) => (
            <JapaneseAPI
              key={data.firebaseKey}
              {...data}
              japaneseData={japaneseData}
              setJapaneseData={setJapaneseData}
              setOpenForm={setOpenForm}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
