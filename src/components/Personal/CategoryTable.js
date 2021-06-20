import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Table } from 'reactstrap';
import DeleteButton from './DeleteButton';

export default function CategoryTable({ category, setCategory, user }) {
  const [openTable, setOpenTable] = useState(false);

  const handleClick = () => {
    setOpenTable((prevState) => !prevState);
  };

  return (
    <>
      <motion.a
        whileHover={{ scale: 1.1 }}
        className='categoryBtn'
        type='button'
        onClick={handleClick}
      ><i className="far fa-list-alt mr-2"></i>
        {openTable ? 'Close' : 'Category List'}
      </motion.a>
      {openTable
        && <Table bordered className='categoryTable'>
          <thead>
            <tr>
            <th>Category Name</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {category.reverse().map((item) => (
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
