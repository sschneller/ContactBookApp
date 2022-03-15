const ContactListEntry = ({ contactInfo, selectedContact, setSelectedContact, editMode }) => {
  const { firstName, lastName } = contactInfo;

  // Didn't want to spend a ton of time on getting hover to work perfectly
  // Known issue that background gets colored even when disabled
  // Used CSS for hacky half-solution as example of how user should be denied
  // changing contacts til edits are done. This is one piece of the puzzle for
  // preventing state getting corrupted through user error.
  return (
    <div
      className="john"
      onClick={() => {
        if (!editMode) {
          setSelectedContact(contactInfo.id)
        }
      }}
      style={{
        background: selectedContact === contactInfo.id ? '#B4D5FF' : '',
        color: editMode ? 'grey' : 'black',
        cursor: editMode ? 'default' : 'pointer',
      }}
    >
      <div>{firstName} {lastName}</div>
    </div>
  );
};

export default ContactListEntry;
