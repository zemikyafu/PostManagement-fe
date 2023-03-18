import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { ContactsContext } from "../../context/contacts.context";

const ManageContacts = () => {
  const contactsContext = useContext(ContactsContext);
  const { editMode, saving, submitContact, editContact, setEditMode } =
    contactsContext;
  const user = JSON.parse(sessionStorage.user);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    type: "",
  });

  const { name, email, phone, type } = form;

  useEffect(() => {
    setForm({ ...editMode.data });
  }, [editMode]);

  const onChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const resetForm = () => setForm({ name: "", email: "", phone: "", type: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    resetForm();
    if (!editMode.status) {
      const { id, ...rest } = form;
      submitContact(rest);
    } else {
      editContact(form);
    }
  };

  return (
    <Card>
      <Card.Header as="h5">
        {editMode.status ? "Edit" : "Add"} Contact
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              placeholder="Enter phone"
              onChange={onChange}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <Form.Check
              onChange={onChange}
              inline
              label="Personal"
              checked={type === "personal"}
              name="type"
              value="personal"
              type="radio"
              id="type"
            />
            <Form.Check
              inline
              checked={type === "professional"}
              onChange={onChange}
              label="Professional"
              value="professional"
              name="type"
              type="radio"
              id="type"
            />
          </div>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" disabled={saving}>
              {saving && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {!saving && <span>Save</span>}
            </Button>
            <Button
              variant="secondary"
              type="reset"
              onClick={() => {
                resetForm();
                setEditMode({ status: false, data: null });
              }}
            >
              Clear
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ManageContacts;
