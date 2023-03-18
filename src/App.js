import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home/home";
import Post from "./pages/post/post"
import PrivateRoute from "./components/routing/private-route";
import { AuthContext } from "./context/auth.context";
import axios from "axios";
import PostList from "./pages/postList/postList";

function App() {
  const [state, setState] = useState({
    isAuthenticated: false,
  });

  return (
    <AuthContext.Provider value={{ ...state }}>
      <Router>
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route exact element={<Login />} path="/login" />
          <Route exact element={<Register />} path="/register" />
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            }
          />

          <Route
              exact
              path="/post"
              element={
                <PrivateRoute>
                  <Post/>
                </PrivateRoute>
              }
          />
            <Route
                exact
                path="/postList"
                element={
                    <PrivateRoute>
                        <PostList/>
                    </PrivateRoute>
                }
            />

        </Routes>

      </Router>
    </AuthContext.Provider>
  );
}

export default App;
