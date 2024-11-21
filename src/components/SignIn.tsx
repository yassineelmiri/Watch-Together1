import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Define the mutation for login
  const mutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const response = await axios.post("http://localhost:4000/auth/login", loginData);
      return response.data;
    },
    onSuccess: (data) => {
      // Save the received data (token and user data) in localStorage
      localStorage.setItem("token", data.token); // Save the token
      localStorage.setItem("userData", JSON.stringify(data.user)); // Save the user data (assuming `data.user` contains user details)

      // Optionally save other relevant data if available
      // Example: localStorage.setItem("role", data.user.role);

      // Redirect to Dashboard
      navigate("/Dashboard");
    },
    onError: (error) => {
      alert(error || "An error occurred");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the mutation
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
