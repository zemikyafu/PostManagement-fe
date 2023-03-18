import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { PostsContext } from "../../context/posts.context";

const ManagePosts = () => {
  const postsContext = useContext(PostsContext);
  const { editMode, saving, submitPost, editPost, setEditMode } =
      postsContext;
  const user = JSON.parse(sessionStorage.user);

  const [form, setForm] = useState({
    id: "",
    title: "",
    body: "",
  });

  const { title, body } = form;

  useEffect(() => {
    setForm({ ...editMode.data });
  }, [editMode]);

  const onChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const resetForm = () => setForm({ title: "", body: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    resetForm();
    if (!editMode.status) {
      const { id, ...rest } = form;
      submitPost(rest);
    } else {
      editPost(form);
    }
  };

  return (
    <Card>
      <Card.Header as="h5">
        {editMode.status ? "Edit" : "Add"} Post
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="title"
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              type="text"
              as="textarea" rows={5}
              value={body}
              placeholder="body"
              onChange={onChange}
              required
            />
          </Form.Group>


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

export default ManagePosts;
