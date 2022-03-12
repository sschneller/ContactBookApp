import PropTypes from 'prop-types';
import { FormCheck } from 'react-bootstrap';

const ControlBar = ({ editMode, setEditMode }) => {
  return <FormCheck type="switch" label="Edit Mode" checked={editMode} onChange={() => setEditMode(!editMode)} />;
};

ControlBar.propTypes = {
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default ControlBar;
