import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../auth/auth.service"
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;
  const navigate = useNavigate();

  const login = async ({email,password})=>{

   await AuthService.login(email,password).then(
        (res)=>{
          console.log(res)
                  if (res.accessToken != null && res.status) {

                  //  const { password, ...rest } = res.data[0];
                     sessionStorage.setItem("isAuthenticated", "true");
                     const user ={name:res.name, id:res.id}
                    sessionStorage.setItem("user", JSON.stringify( user));
                    localStorage.setItem("accessToken",res.accessToken);
                    navigate("/home");
                  }
        })
        .catch((err)=>console.log(err))
         .finally(()=>setLoading(false));
  } ;

  const onChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div
      className="d-flex justify-content-center vh-100"
      style={{ border: "1px solid black" }}
    >
      <Form onSubmit={onSubmit} className="w-25 align-self-center">
        <div className="alert alert-primary text-center">
          <h1>Login</h1>
        </div>
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
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
        <div className="mt-3">
          <span>
            Don't have account? <Link to="/register">register here</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Login;
