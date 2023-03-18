import Alert from "react-bootstrap/Alert";
import React from "react";

const Notification = ({ title, type }) => {
  return (
    <Alert key={type} variant={type}>
      {title}
    </Alert>
  );
};

export default Notification;
