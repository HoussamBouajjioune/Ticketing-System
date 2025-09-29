// import { useEffect, useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import ProtectedRoute from "./components/ProtectedRoute";
// import './App.css'
// import Login from './pages/login'
// import SignUp from './pages/signup'
// import { AuthProvider, useAuth } from "./store/auth";
// import { loginUser } from './apis/auth'



// function App() {
//   const [count, setCount] = useState(0)
//   // useEffect(() => {
//   //   const testLogin = async () => {
//   //     const email = "john@example.com"
//   //     const password = "123456"
//   //     const user = await loginUser(email, password)
//   //     if (user) {
//   //       console.log("Login successful:", user)
//   //     } else {
//   //       console.log("Login failed")
//   //     }
//   //   }
//   //   testLogin()
//   // }, [])  

//   return (
//     <>
//       {/* <Layout> */}
//       {/* <Login /> */}
//       {/* <SignUp /> */}
//       <AuthProvider>
//         <Router>
//           <Routes>

//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//           </Routes>
//         </Router>

//       </AuthProvider>

//       {/* </Layout> */}




//     </>
//   )
// }

// export default App


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { AuthProvider } from "./store/auth";
import ProtectedRoute from "./components/ProtectedRoute"; // uncomment when needed
import UserPage from "./pages/user/user";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SupportDashboard from "./pages/support/SupportDashboard";


// import AdminPage1 from "./pages/admin/AdminPage1";
// import SupportPage1 from "./pages/support/SupportPage1";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Example of Protected Routes */}
          
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute roles={["user"]}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support/dashboard"
            element={
              <ProtectedRoute roles={["support"]}>
                <SupportDashboard />
              </ProtectedRoute>
            }
          />
         

          {/* Redirect unknown paths to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
