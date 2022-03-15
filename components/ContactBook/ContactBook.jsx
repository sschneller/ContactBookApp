import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash';

import ContactList from '../ContactList';
import ContactInfo from '../ContactInfo';

import * as mockData from '../mock-data.json';

/**
 * ContactBook is the top level component for the application. It is the primary handler of "global" state.
 * Due to the state being a bit messy already, a solid improvement would be to implement some kind of real
 * state handler, such as Redux. This was chosen against for now due to the time limitation. Another
 * improvment to the structure would be storing data in some DB to query that instead of mock data. As well,
 * GraphQL middleware could be setup. This would allow the compute heavy state changes to be performed at
 * the data retrieval layer, not the frontend, improving performace for users.
 **/
const ContactBook = () => {
  // Take pre-created data, and assign unique ids. This would ostensibly be handled by a DB if that were implemented.
  const tempMockData = {};
  mockData.forEach((entry) => {
    const id = uuidv4();
    tempMockData[id] = { id, ...entry };
  });

  // Tracks whether the app is in edit state. This disables most user interraction with the UI other to prevent state corruption.
  const [editMode, setEditMode] = useState(false);
  // Map of data, using the id of the data as the key for the kv pairs
  const [contactList, setContactList] = useState(tempMockData);
  // ID of the entry that is currently selected. There should be no cases where this is empty, testing could be added to verify this never happens.
  const [selectedContact, setSelectedContact] = useState('');

  // Object to hold mutator methods. Uses spread syntax to maintain immutability.
  const stateMethods = {
    addNewContact: () => {
      const id = uuidv4();
      setContactList({ ...contactList, [id]: { id, firstName: 'placeholder', lastName: 'placeholder', emailAddress: '', phoneNumber: ''}});
      setSelectedContact(id);
    },
    removeContact: (id) => {
      setContactList(omit(contactList, [id]));
    },
    editContact: (id, field, value) => {
      setContactList({ ...contactList, [id]: { ...contactList[id], [field]: value} });
    }
  };

  // Verifies that if page is reloaded, it selects first entry in list.
  // This is to prevent no entry being selected and get state issues.
  // This is hacky and should not be used in production.
  // A better implementation would not render page until data is retrieved.
  // The cb or event trigger for that happening would be what actually
  // sets the initial entry.
  useEffect(() => {
    setSelectedContact(Object.values(contactList)[0].id);
  }, [])

  return (
    <Container fluid>
      <Row>
        <div style={{ height: '4.5vh', background: '#9aa', marginBottom: '.5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="text-white">Contact Book</h2>
          {/* <button type="button" onClick={() => { stateMethods.editContact(selectedContact, 'firstName', 'JOHN') }}>TEST</button> */}
        </div>
      </Row>
      <Row>
        <Col sm={4}>
          <div className="h-95-w-full">
            <ContactList contactList={Object.values(contactList)} selectedContact={selectedContact} setSelectedContact={setSelectedContact} editMode={editMode} />
          </div>
        </Col>
        <Col sm={8}>
          <div className="h-95-w-full">
            <ContactInfo selectedContact={selectedContact} contactList={contactList} editMode={editMode} setEditMode={setEditMode} stateMethods={stateMethods} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactBook;
