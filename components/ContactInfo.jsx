import Image from 'next/image';
import { Card, Col, Form, FormCheck, Row } from 'react-bootstrap';

/**
 * ContactInfo controls the form that allows the rendering and editing of contact information.
 **/
const ContactInfo = ({ selectedContact, contactList, editMode, setEditMode, stateMethods }) => {
  // Prevent loading until state has loaded
  if (!contactList || !selectedContact || !contactList[selectedContact]) return <></>;
  
  const handleChange = (field, value) => {
    stateMethods.editContact(selectedContact, field, value);
  };

  const { firstName, lastName, emailAddress, phoneNumber } = contactList[selectedContact];
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={1}>
            <Image src="/avatar.png" alt="me" width="100%" height="100%" />
          </Col>
          <Col sm={8}>
            {editMode ? (
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="formLastName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => { handleChange('firstName', e.target.value) }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => { handleChange('lastName', e.target.value) }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formEmailAddress">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    value={emailAddress}
                    onChange={(e) => { handleChange('emailAddress', e.target.value) }}
                  />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => { handleChange('phoneNumber', e.target.value) }}
                  />
                </Form.Group>
              </Form>
            ) : (
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="First name" value={firstName} disabled readOnly />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Last name" value={lastName} disabled readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formEmailAddress">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Email address" value={emailAddress} disabled readOnly />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Phone number" value={phoneNumber} disabled readOnly />
                </Form.Group>
              </Form>
            )}
          </Col>
          <Col>
            <FormCheck
              type="switch"
              label="Edit Mode"
              checked={editMode}
              onChange={() => {
                setEditMode(!editMode);
              }}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ContactInfo;
