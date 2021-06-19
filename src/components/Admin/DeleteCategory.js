import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { deletePublicCategoryData } from '../../helpers/data/publicCategoryData';

export default function DeleteButton({
  setOpenCategory,
  firebaseKey,
}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    deletePublicCategoryData(firebaseKey).then((response) => setOpenCategory(response));
  };
  return (
    <div>
    <Button id='publicCategoryDeleteBtn' key={firebaseKey} onClick={toggle}><i className="far fa-trash-alt mr-2"></i>Remove</Button>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>WARNING!!!!!!!!!!!!!</ModalHeader>
        <ModalBody>
          Deleting public category may impact your whole app to malfunction. Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleSubmit}>HECK YEAH!</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

DeleteButton.propTypes = {
  setOpenCategory: PropTypes.func,
  firebaseKey: PropTypes.string.isRequired
};
