import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import authService from "../auth/auth.service";
import AuthService from "../auth/auth.service";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = form;
  const navigate = useNavigate();

  const register = async (values) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
        AuthService.register( values.name,values.email,values.password)
      .then((res) => {
        if (res.success) {
          resetForm();
          navigate("/login");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const resetForm = () =>
    setForm({ name: "", email: "", confirmPassword: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    register(rest);
  };

  return (
    <div
      className="d-flex justify-content-center vh-100"
      style={{ border: "1px solid black" }}
    >
      <Form onSubmit={onSubmit} className="w-25 align-self-center">
        <div className="alert alert-primary text-center">
          <h1>Register</h1>
        </div>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            required
            value={name}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            isInvalid={password !== confirmPassword}
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            isInvalid={password !== confirmPassword}
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={onChange}
          />
          {password !== confirmPassword && (
            <Form.Text className="text-danger">
              Passwords do not match.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {!loading && <span>Submit</span>}
          </Button>
        </div>
        <div className="mt-3">
          <span>
            Already have an account? <Link to="/login">login here</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Register;
