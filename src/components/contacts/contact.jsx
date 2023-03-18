import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { ContactsContext } from "../../context/contacts.context";

const Contact = ({ contact }) => {
  const { id, name, email, phone, type } = contact;
  const contactsContext = useContext(ContactsContext);
  const { setEditMode, deleteContact } = contactsContext;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{phone}</Card.Text>
        <Card.Text>{email}</Card.Text>
        <Button
          variant="link"
          onClick={() => setEditMode({ status: true, data: contact })}
        >
          Edit
        </Button>
        <Button
          className="text-danger"
          variant="link"
          onClick={() => deleteContact(id)}
        >
          Delete
        </Button>
        <Badge
          className="float-end"
          bg={type === "personal" ? "primary" : "success"}
        >
          {type}
        </Badge>
      </Card.Body>
    </Card>
  );
};

export default Contact;
