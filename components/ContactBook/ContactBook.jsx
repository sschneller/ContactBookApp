import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash';

import ContactList from '../ContactList';
import ContactInfo from '../ContactInfo';

import styles from './ContactBook.module.css';

/**
 * ContactBook is the top level component for the application. It is the primary handler of "global" state.
 * Due to the state being a bit messy already, a solid improvement would be to implement a full state handler,
 * such as Redux. This was chosen against for now due to the time limitation. Another improvment to the
 * structure would be storing data in some DB to query that instead of mock data. As well, GraphQL middleware
 * could be setup. This would allow the compute heavy state changes to be performed at the data retrieval layer,
 * not the frontend, improving performace for users.
 **/
const ContactBook = () => {
  const mockData = [
    {
      "firstName": "Aguirre",
      "lastName": "Burgess",
      "emailAddress": "aguirreburgess@optique.com",
      "phoneNumber": "(939) 532-3282"
    },
    {
      "firstName": "Mai",
      "lastName": "Clay",
      "emailAddress": "maiclay@optique.com",
      "phoneNumber": "(910) 582-3261"
    },
    {
      "firstName": "Nunez",
      "lastName": "Barnett",
      "emailAddress": "nunezbarnett@optique.com",
      "phoneNumber": "(972) 502-2789"
    },
    {
      "firstName": "Riddle",
      "lastName": "Franco",
      "emailAddress": "riddlefranco@optique.com",
      "phoneNumber": "(891) 595-2998"
    },
    {
      "firstName": "Lynette",
      "lastName": "Guzman",
      "emailAddress": "lynetteguzman@optique.com",
      "phoneNumber": "(803) 564-2715"
    },
    {
      "firstName": "Shelton",
      "lastName": "Fields",
      "emailAddress": "sheltonfields@optique.com",
      "phoneNumber": "(842) 521-3850"
    },
    {
      "firstName": "Turner",
      "lastName": "Wilson",
      "emailAddress": "turnerwilson@optique.com",
      "phoneNumber": "(825) 498-3886"
    },
    {
      "firstName": "Consuelo",
      "lastName": "Hebert",
      "emailAddress": "consuelohebert@optique.com",
      "phoneNumber": "(974) 444-3959"
    },
    {
      "firstName": "Casey",
      "lastName": "Langley",
      "emailAddress": "caseylangley@optique.com",
      "phoneNumber": "(804) 412-3977"
    },
    {
      "firstName": "Shelly",
      "lastName": "Small",
      "emailAddress": "shellysmall@optique.com",
      "phoneNumber": "(914) 417-3374"
    },
    {
      "firstName": "Ruthie",
      "lastName": "Wilkinson",
      "emailAddress": "ruthiewilkinson@optique.com",
      "phoneNumber": "(851) 432-3203"
    },
    {
      "firstName": "Alexandra",
      "lastName": "Santos",
      "emailAddress": "alexandrasantos@optique.com",
      "phoneNumber": "(840) 562-3407"
    },
    {
      "firstName": "Corinne",
      "lastName": "Shelton",
      "emailAddress": "corinneshelton@optique.com",
      "phoneNumber": "(824) 416-3443"
    },
    {
      "firstName": "Whitehead",
      "lastName": "Sweet",
      "emailAddress": "whiteheadsweet@optique.com",
      "phoneNumber": "(870) 599-3927"
    },
    {
      "firstName": "Tucker",
      "lastName": "Maldonado",
      "emailAddress": "tuckermaldonado@optique.com",
      "phoneNumber": "(885) 429-3452"
    },
    {
      "firstName": "Michelle",
      "lastName": "Sears",
      "emailAddress": "michellesears@optique.com",
      "phoneNumber": "(961) 597-3369"
    },
    {
      "firstName": "Yang",
      "lastName": "Tillman",
      "emailAddress": "yangtillman@optique.com",
      "phoneNumber": "(905) 584-2464"
    }
  ];
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
    // Due to time constraints at my current job, I wasn't able to spend time developing multiple-contact creation. However, if I were
    // to implement something like this, I would take into consideration that I don't fully understand what the requirement is asking
    // for, or why. In a formal work environment, I would take time to communicate with the project manager (or client if that were more
    // appropriate) to get clarification on what this kind of feature would look like to the user so that I can best create it. With no
    // further explanation, I would add extra functionality to the + button which would queue up more of the panels currently used for
    // viewing and editing contact info (ContactInfo) as a vertical scrollable list.
    addNewContact: () => {
      const id = uuidv4();
      setContactList({ ...contactList, [id]: { id, firstName: "", lastName: "", emailAddress: "", phoneNumber: "" }});
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
    if (contactList && Object.values(contactList).length > 0 && Object.values(contactList)[0] && Object.values(contactList)[0].id) {
      setSelectedContact(Object.values(contactList)[0].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container fluid>
      <Row>
        <div className={styles.topBar}>
          <h2 className="text-white">Contact Book</h2>
        </div>
      </Row>
      <Row>
        <Col sm={4}>
          <div className={styles.h90wfull}>
            <ContactList contactList={Object.values(contactList)} selectedContact={selectedContact} setSelectedContact={setSelectedContact} editMode={editMode} setEditMode={setEditMode} stateMethods={stateMethods} />
          </div>
        </Col>
        <Col sm={8}>
          <div className={styles.h90wfull}>
            <ContactInfo selectedContact={selectedContact} contactList={contactList} editMode={editMode} setEditMode={setEditMode} stateMethods={stateMethods} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactBook;
