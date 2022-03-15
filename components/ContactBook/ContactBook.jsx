import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ContactList from '../ContactList';
import ContactInfo from '../ContactInfo';

import * as mockData from '../mock-data.json';

const ContactBook = () => {
  const [editMode, setEditMode] = useState(false);
  const [contactList, setContactList] = useState(mockData);
  const [selectedContact, setSelectedContact] = useState({});

  // Verifies that if page is reloaded, it selects first entry in list.
  // This is to prevent no entry being selected and get state issues.
  useEffect(() => {
    setSelectedContact(contactList[0]);
  }, [])

  return (
    <Container fluid>
      <Row>
        <div style={{ height: '4.5vh', background: '#9aa', marginBottom: '.5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="text-white">Contact Book</h2>
        </div>
      </Row>
      <Row>
        <Col sm={4}>
          <div className="h-95-w-full">
            <ContactList contactList={contactList} selectedContact={selectedContact} setSelectedContact={setSelectedContact} editMode={editMode} />
          </div>
        </Col>
        <Col sm={8}>
          <div className="h-95-w-full">
            <ContactInfo selectedContact={selectedContact} editMode={editMode} setEditMode={setEditMode} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactBook;
