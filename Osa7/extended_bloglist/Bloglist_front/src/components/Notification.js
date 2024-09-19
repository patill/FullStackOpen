import PropTypes from "prop-types";

const Notification = ({ classname, message }) => {
  //console.log(classname);
  if (message === null) {
    return null;
  }

  return <div className={classname}>{message}</div>;
};

Notification.propTypes = {
  classname: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
