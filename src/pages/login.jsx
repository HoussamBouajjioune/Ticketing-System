import React, { useState } from "react";
import { useAuth } from "../store/auth"; // Make sure path is correct

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    // Trim inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password;

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter email and password");
      return;
    }

    const success = await login(trimmedEmail, trimmedPassword);
    if (!success) {
      setError("Invalid credentials");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white">Login</h3>
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

        {/* Separator */}
        <div className="flex items-center gap-2 mb-6">
          <span className="flex-1 h-px bg-gray-600"></span>
          <span className="text-gray-400">OR</span>
          <span className="flex-1 h-px bg-gray-600"></span>
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <a
              href="#"
              className="block text-right text-sm text-indigo-400 hover:underline mt-1"
            >
              Forgot your password?
            </a>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-indigo-400 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
