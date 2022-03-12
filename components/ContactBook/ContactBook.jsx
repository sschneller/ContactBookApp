import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ContactList from '../ContactList';
import ContactInfo from '../ContactInfo';
import ControlBar from '../ControlBar';

import * as mockData from '../mock-data.json';

const ContactBook = () => {
  const [editMode, setEditMode] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(-1);

  useEffect(() => {
    setContactList(mockData);
    setSelectedContact(3);
  }, []);

  const addContact = () => {
    
  };

  return (
    <Container fluid>
      <Row>
        <div style={{ height: '4.5vh', background: '#9aa', marginBottom: '.5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ControlBar editMode={editMode} setEditMode={setEditMode} />
        </div>
      </Row>
      <Row>
        <Col sm={4}>
          <div className="h-95-w-full">
            <ContactList contactList={contactList} />
          </div>
        </Col>
        <Col sm={8}>
          <div className="h-95-w-full">
            <ContactInfo selectedContact={selectedContact} contactList={contactList} setContactList={setContactList} editMode={editMode} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ContactBook;
