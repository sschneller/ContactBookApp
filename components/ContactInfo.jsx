import Image from 'next/image'
import PropTypes from 'prop-types';
import { Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';

const ContactInfo = ({ selectedContact, contactList, setContactList, editMode }) => {
  if (selectedContact > -1) {
    if (selectedContact.firstName) {
      const { firstName, lastName, emailAddress, phoneNumber } = selectedContact;
      if (editMode) {
        return (
          <Card>
            <Card.Body>
              <Row>
                <Col sm={1}>
                  <Image src="/fbprofile.jpg" alt="me" width="100%" height="100%" />
                </Col>
                <Col sm={8}>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group controlId="formLastName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="First name" value={firstName} />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formLastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Last name" value={lastName} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="formEmailAddress">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" placeholder="Email address" value={emailAddress} />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="tel" placeholder="Phone number" value={phoneNumber} />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );  
      }
      return (
        <Card>
          <Card.Body>
            <Row>
              <Col sm={1}>
                <Image src="/fbprofile.jpg" alt="me" width="100%" height="100%" />
              </Col>
              <Col sm={8}>
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
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    }
  }
  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      <h4>No Contact Selected</h4>
    </Card>
  );
};

ContactInfo.propTypes = {
  selectedContact: PropTypes.number.isRequired,
  contactList: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    emailAddress: PropTypes.string,
    phoneNumber: PropTypes.string,
  })).isRequired,
  setContactList: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};
  
export default ContactInfo;
