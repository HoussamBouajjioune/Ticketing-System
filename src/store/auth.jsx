import React, { createContext, useContext, useReducer, useEffect } from "react";
import { loginUser as apiLoginUser, signupUser as apiSignupUser } from "../apis/auth";

const initialAuthState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // read from localStorage
  isAuthenticated: !!localStorage.getItem("user"),        // true if user exists
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload)); // store user
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("user"); // remove on logout
      return { ...initialAuthState, user: null, isAuthenticated: false };
    default:
      return state;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Login method
  const login = async (email, password) => {
    const user = await apiLoginUser(email, password);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      return user; // return full user object
    }
    return null; // login failed
  };

  // Signup method
  const signup = async ({ username, email, password, role = "user" }) => {
    const user = await apiSignupUser({ username, email, password, role });
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      return user;
    }
    return null; // signup failed
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
