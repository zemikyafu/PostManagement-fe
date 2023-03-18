import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { PostsContext } from "../../context/posts.context";

const Post = ({ post }) => {
  const { id, title, body } = post;
  const postsContext = useContext(PostsContext);
  const { setEditMode, deletePost } = postsContext;

  return (

    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Button
          variant="link"
          onClick={() => setEditMode({ status: true, data: post })}
        >
          Edit
        </Button>
        <Button
          className="text-danger"
          variant="link"
          onClick={() => deletePost(id)}
        >
          Delete
        </Button>

      </Card.Body>
    </Card>
  );
};

export default Post;
