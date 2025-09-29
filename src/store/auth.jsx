import React, { createContext, useContext, useReducer } from "react";
import { loginUser as apiLoginUser, signupUser as apiSignupUser } from "../apis/auth"; // import signupUser

const initialAuthState = {
  user: null,          // full user object
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...initialAuthState };
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
      return true;
    }
    return false;
  };

  // Signup method
  const signup = async ({ username, email, password, role = "user" }) => {
    const user = await apiSignupUser({ username, email, password, role });
    if (user) {
      dispatch({ type: "LOGIN", payload: user }); // store in context immediately
      return true; // signup + login success
    }
    return false; // signup failed
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
