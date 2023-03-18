import React, { useContext, useEffect, useState } from "react";
import Contact from "./contact";
import Loader from "../shared/loader";
import Notification from "../shared/notification";
import { ContactsContext } from "../../context/contacts.context";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Contacts = () => {
  const contactsContext = useContext(ContactsContext);
  const { getContacts, searchContact, contacts, loading } = contactsContext;

  useEffect(() => {
    getContacts();
  }, []);

  const onChange = (e) => {
    if (e.target.value) {
      searchContact(e.target.value);
    } else {
      getContacts();
    }
  };

  const renderContacts = () => (
    <div className="d-flex flex-column gap-3">
      {contacts.map((item) => (
        <Contact key={item.id} contact={item} />
      ))}
    </div>
  );

  return (
    <Card className="h-75">
      <Card.Header
        as="h5"
        className="d-flex flex-column flex-lg-row justify-content-between"
      >
        Contacts
        <Form className="d-flex">
          <Form.Control
            type="search"
            onChange={onChange}
            placeholder="search contact"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </Card.Header>
      <Card.Body className="overflow-auto ">
        {loading && <Loader />}
        {!loading && contacts.length > 0 && renderContacts(contacts)}
        {!loading && contacts.length === 0 && (
          <Notification title="No Contacts!" type="danger" />
        )}
      </Card.Body>
    </Card>
  );
};

export default Contacts;
