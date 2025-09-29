// import React, { useState } from "react";
// import Modal from "../components/common/Modal";

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsModalOpen(true); // show modal after "sign up"
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
//       <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
//         {/* Title */}
//         <div className="text-center mb-6">
//           <h3 className="text-2xl font-bold text-white">Sign Up</h3>
//           <p className="text-gray-400 text-sm">
//             Sign up for free to access any of our products
//           </p>
//         </div>

//         {/* Social Login Options */}
//         <div className="space-y-3 mb-6">
//           <a
//             href="#"
//             className="flex items-center justify-center gap-2 border border-gray-600 rounded-lg py-2 text-white hover:bg-gray-700"
//           >
//             <img src="./assets/icons/google.svg" alt="Google" className="w-5 h-5" />
//             <span className="font-medium">Continue With Google</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center justify-center gap-2 border border-gray-600 rounded-lg py-2 text-white hover:bg-gray-700"
//           >
//             <img src="./assets/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
//             <span className="font-medium">Continue With Twitter</span>
//           </a>
//         </div>

//         {/* Sign Up Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Username */}
//           <div>
//             <label className="block text-gray-300 text-sm mb-1">
//               User name or email address
//             </label>
//             <input
//               type="text"
//               defaultValue="designer@gmail.com"
//               className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your email"
//               required
//             />
//             <span className="text-red-400 text-xs">
//               *Please enter a valid email address.
//             </span>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-300 text-sm mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-sm"
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//             <span className="text-gray-400 text-xs">
//               Use 8 or more characters with a mix of letters, numbers & symbols
//             </span>
//           </div>

//           {/* Checkboxes */}
//           <ul className="space-y-2">
//             <li className="flex items-center gap-2 text-gray-300 text-sm">
//               <input type="checkbox" required />
//               <span>
//                 Agree to our{" "}
//                 <a href="#" className="underline text-indigo-400">
//                   Terms of use
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="underline text-indigo-400">
//                   Privacy Policy
//                 </a>
//               </span>
//             </li>
//             <li className="flex items-center gap-2 text-gray-300 text-sm">
//               <input type="checkbox" />
//               <span>Subscribe to our monthly newsletter.</span>
//             </li>
//           </ul>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="mt-6 text-center text-gray-400 text-sm">
//           Already have an account?{" "}
//           <a href="#" className="text-indigo-400 font-medium hover:underline">
//             Log in
//           </a>
//         </p>
//       </div>

//       {/* Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Sign Up Request Sent"
//       >
//         <p>
//           Your sign-up request has been sent to the admin. Please check your email
//           for confirmation.
//         </p>
//       </Modal>
//     </div>
//   );
// };

// export default SignUp;

import React, { useEffect, useState } from "react";
import Modal from "../components/common/Modal";
import { useAuth } from "../store/auth";

const SignUp = () => {
  const { signup, isAuthenticated, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

   // ✅ Auto-redirect if already logged in
    useEffect(() => {
      if (isAuthenticated && user) {
        switch (user.role) {
          case "admin":
            navigate("/admin/dashboard", { replace: true });
            break;
          case "support":
            navigate("/support/dashboard", { replace: true });
            break;
          default:
            navigate("/user/dashboard", { replace: true });
            break;
        }
      }
    }, [isAuthenticated, user, navigate]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    const success = await signup({ username, email, password });
    if (success) {
      setIsModalOpen(true); // show modal on success
      setFormData({ username: "", email: "", password: "" });
      // Redirect based on role
      switch (success.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "support":
          navigate("/support/dashboard");
          break;
        default:
          navigate("/user/dashboard");
          break;
      }
    } else {
      setError("Email or username already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white">Sign Up</h3>
          <p className="text-gray-400 text-sm">
            Sign up for free to access any of our products
          </p>
        </div>

        {/* Social Login Options */}
        <div className="space-y-3 mb-6">
          <a
            href="#"
            className="flex items-center justify-center gap-2 border border-gray-600 rounded-lg py-2 text-white hover:bg-gray-700"
          >
            <img src="./assets/icons/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-medium">Continue With Google</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 border border-gray-600 rounded-lg py-2 text-white hover:bg-gray-700"
          >
            <img src="./assets/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
            <span className="font-medium">Continue With Twitter</span>
          </a>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <span className="text-gray-400 text-xs">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>
          </div>

          {/* Checkboxes */}
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="checkbox" required />
              <span>
                Agree to our{" "}
                <a href="#" className="underline text-indigo-400">
                  Terms of use
                </a>{" "}
                and{" "}
                <a href="#" className="underline text-indigo-400">
                  Privacy Policy
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="checkbox" />
              <span>Subscribe to our monthly newsletter.</span>
            </li>
          </ul>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sign Up Successful"
      >
        <p>Your account has been created successfully!</p>
      </Modal>
    </div>
  );
};

export default SignUp;

