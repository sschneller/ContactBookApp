import { useEffect, useState } from 'react';
import { Card, FormCheck, Pagination } from 'react-bootstrap';
import chunk from 'lodash/chunk';

import ContactListEntry from './ContactListEntry';

const ContactList = ({ contactList, selectedContact, setSelectedContact, editMode }) => {
  const [activePage, setActivePage] = useState(1);
  const [temp, setTemp] = useState(false);

  const sortedList = [...contactList].sort((a, b) => {
    const afullName = `${a.firstName} ${a.lastName}`;
    const bfullName = `${b.firstName} ${b.lastName}`;

    if (afullName < bfullName) {
      return -1;
    }
    if (afullName > bfullName) {
      return 1;
    }
    return 0;
  });

  const [chunkedList, setChunkedList] = useState(chunk(sortedList, 5));
  const pages = chunkedList.length === 0 ? 1 : chunkedList.length; 

  const items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} disabled={pages === 1 || editMode} onClick={() => {setActivePage(number)}}>
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

  useEffect(() => {
    if (temp) setChunkedList(chunk(sortedList.reverse(), 5));
    else setChunkedList(chunk(sortedList, 5));
  }, [temp, editMode]);

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
        { /*
        This checkbox is a quick way of making some sort toggleable (asc vs dsc),
        but normally this would be a button in the header of the list, maybe using buttons with swappable icons for text
        */ }
        <FormCheck
          type="switch"
          label="Descending"
          checked={temp}
          onChange={() => {
            setTemp(!temp);
          }}
        />
        <Pagination>
          <Pagination.Prev disabled={pages === 1 || activePage === 1 || editMode} onClick={prevPage} />
          {items}
          <Pagination.Next disabled={pages === 1 || activePage === pages || editMode} onClick={nextPage} />
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default ContactList;
