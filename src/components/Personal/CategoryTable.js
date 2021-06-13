import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import DeleteButton from './DeleteButton';

export default function CategoryTable({ category, setCategory, user }) {
  const [openTable, setOpenTable] = useState(false);

  const handleClick = () => {
    setOpenTable((prevState) => !prevState);
  };

  return (
    <>
      <a className='categoryBtn' type='button' onClick={handleClick}>{openTable ? 'Close' : 'Category List'}</a>
      {openTable
        && <Table bordered className='categoryTable'>
          <thead>
            <tr>
            <th>Category Name</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {category.map((item) => (
            <tr
              key={item.firebaseKey}
            >
              <th>{item.categoryName}</th>
              <th><DeleteButton {...item} setCategory={setCategory} user={user}/></th>
            </tr>
          ))}
        </tbody>
        </Table>
      }
    </>
  );
}

CategoryTable.propTypes = {
  category: PropTypes.array.isRequired,
  setCategory: PropTypes.func,
  user: PropTypes.any
};
