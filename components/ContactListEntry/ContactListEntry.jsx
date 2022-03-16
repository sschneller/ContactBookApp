import styles from './ContactListEntry.module.css';

const ContactListEntry = ({ contactInfo, selectedContact, setSelectedContact, editMode, stateMethods }) => {
  const { id, firstName, lastName } = contactInfo;

  return (
    <div
      className={`${styles.entry} ${!editMode ? styles.entryEnabled : styles.entryDisabled} ${selectedContact === contactInfo.id ? styles.entrySelected : {}}`}
      onClick={() => {
        if (!editMode) {
          setSelectedContact(contactInfo.id)
        }
      }}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div>{firstName} {lastName}</div>
      <div>
        <button type="button" disabled={editMode} style={{ color: 'red', borderRadius: '4px' }} onClick={(e) => {
          e.stopPropagation()
          stateMethods.removeContact(id);
        }}>x</button>
      </div>
    </div>
  );
};

export default ContactListEntry;
