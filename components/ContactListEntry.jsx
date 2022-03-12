import PropTypes from 'prop-types';

const ContactListEntry = ({ contactInfo }) => {
  const { firstName, lastName, emailAddress, phoneNumber } = contactInfo;
  return (
    <div className="john">
      <div>{firstName} {lastName}</div>
      <div>{emailAddress}</div>
      <div>{phoneNumber}</div>
    </div>
  );
};

ContactListEntry.propTypes = {
  contactInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    emailAddress: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
};

export default ContactListEntry;
