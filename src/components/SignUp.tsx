import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");  // Add state for username
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (signupData: { email: string, password: string, username: string }) => {
      const response = await axios.post("http://localhost:4000/auth/signup", signupData);
      return response.data;
    },
    onSuccess: () => {
      // Redirect to login page on successful signup
      navigate("/");
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'An error occurred');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      mutation.mutate({ email, password, username: username || email.split('@')[0] }); // Default to email prefix as username
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Link to="/" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
