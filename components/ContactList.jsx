import { useEffect, useState } from 'react';
import { Button, Card, FormCheck, Pagination } from 'react-bootstrap';
import chunk from 'lodash/chunk';

import ContactListEntry from './ContactListEntry/ContactListEntry';

/**
 * ContactList is the list view that renders the list of contacts in the contact book. It will live update
 * as changes are made to the contacts.
 **/
const ContactList = ({ contactList, selectedContact, setSelectedContact, editMode, setEditMode, stateMethods }) => {
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
  const [activePage, setActivePage] = useState(1);
  const [switchState, setSwitchState] = useState(false);
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

  const changeSortDirection = (list) => {
    if (switchState) setChunkedList(chunk(list.reverse(), 5));
    else setChunkedList(chunk(list, 5));
  }

  // Handle changes to the ed
  useEffect(() => {
    changeSortDirection(sortedList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchState, editMode]);

  useEffect(() => {
    const sList = [...contactList].sort((a, b) => {
      const afullName = `${a.firstName} ${a.lastName}`.toLowerCase();
      const bfullName = `${b.firstName} ${b.lastName}`.toLowerCase();
  
      if (afullName < bfullName) {
        return -1;
      }
      if (afullName > bfullName) {
        return 1;
      }
      return 0;
    });
    changeSortDirection(sList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactList]);

  return (
    <Card>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          { /*
          This checkbox is a quick way of making some sort toggleable (asc vs dsc), but normally this 
          would be a button in the header of the list, maybe using buttons with swappable icons for text
          */ }
          <FormCheck
            type="switch"
            label={!switchState ? 'A-Z' : 'Z-A'}
            checked={switchState}
            onChange={() => {
              setSwitchState(!switchState);
            }}
          />
          <Button
            type="button"
            variant="outline-success"
            onClick={() => {
              stateMethods.addNewContact();
              setEditMode(true);
            }}
          >
            +
          </Button>
        </div>
        <hr />
        <div style={{ height: '40vh', overflow: 'auto' }}>
          {
            chunkedList &&
            chunkedList[activePage - 1] &&
            chunkedList[activePage - 1].map((contactInfo) => (
              <ContactListEntry
                key={contactInfo.id}
                contactInfo={contactInfo}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                editMode={editMode}
                stateMethods={stateMethods}
              />
            ))
          }
        </div>
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
