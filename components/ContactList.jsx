import { useEffect, useState } from 'react';
import { Card, Pagination } from 'react-bootstrap';
import chunk from 'lodash/chunk';
import ContactListEntry from './ContactListEntry';

const ContactList = ({ contactList, selectedContact, setSelectedContact, editMode }) => {
  const [activePage, setActivePage] = useState(1);

  const chunkedList = chunk(contactList, 5);
  const pages = chunkedList.length === 0 ? 1 : chunkedList.length; 

  const items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} disabled={pages === 1} onClick={() => {setActivePage(number)}}>
        {number}
      </Pagination.Item>,
    );
  }

  const prevPage = () => {
    setActivePage(activePage - 1);
  };

  const nextPage = () => {
    setActivePage(activePage + 1);
  };

  return (
    <Card>
      <Card.Body>
        <div style={{ height: '40vh', overflow: 'auto' }}>
          {
            chunkedList &&
            chunkedList[activePage - 1] &&
            chunkedList[activePage - 1].map((contactInfo) => <ContactListEntry contactInfo={contactInfo} selectedContact={selectedContact} setSelectedContact={setSelectedContact} editMode={editMode} />)
          }
        </div>
        <Pagination>
          <Pagination.Prev disabled={pages === 1 || activePage === 1} onClick={prevPage} />
          {items}
          <Pagination.Next disabled={pages === 1 || activePage === pages} onClick={nextPage} />
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default ContactList;
