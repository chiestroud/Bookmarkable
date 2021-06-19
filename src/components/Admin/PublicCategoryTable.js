import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import DeleteCategory from './DeleteCategory';

export default function PublicCategoryTable({ openCategory, setOpenCategory }) {
  const [openTable, setOpenTable] = useState(false);
  const handleClick = () => {
    setOpenTable((prevState) => !prevState);
  };

  return (
    <div>
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
          {openCategory.map((item) => (
            <tr
              key={item.firebaseKey}
            >
              <th>{item.categoryName}</th>
              <th><DeleteCategory {...item} setOpenCategory={setOpenCategory} /></th>
            </tr>
          ))}
        </tbody>
        </Table>
      }
    </div>
  );
}

PublicCategoryTable.propTypes = {
  openCategory: PropTypes.array,
  setOpenCategory: PropTypes.func
};
