import React, { useContext, useEffect, useState } from "react";
import Post from "./post";
import Loader from "../shared/loader";
import Notification from "../shared/notification";
import { PostsContext } from "../../context/posts.context";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Posts = () => {
  const postsContext = useContext(PostsContext);
  const { getPosts, searchPost, posts, loading } = postsContext;

  useEffect(() => {
    getPosts();
  }, []);

  const onChange = (e) => {
    if (e.target.value) {
      searchPost(e.target.value);
    } else {
      getPosts();
    }
  };

  const renderPosts = () => (
    <div className="d-flex flex-column gap-3">
      {posts.map((item) => (
        <Post key={item.id} post={item} />
      ))}
    </div>
  );

  return (
    <Card className="h-75">
      <Card.Header
        as="h5"
        className="d-flex flex-column flex-lg-row justify-content-between"
      >
        Posts
        <Form className="d-flex">
          <Form.Control
            type="search"
            onChange={onChange}
            placeholder="search post"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </Card.Header>
      <Card.Body className="overflow-auto ">
        {loading && <Loader />}
        {!loading && posts.length > 0 && renderPosts(posts)}
        {!loading && posts.length === 0 && (
          <Notification title="No Posts!" type="danger" />
        )}
      </Card.Body>
    </Card>
  );
};

export default Posts;
