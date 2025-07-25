'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ user_mail: '', user_pass: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
        const res = await fetch('http://localhost:3001/api/v1/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
            if (data.errors && Array.isArray(data.errors)) {
            throw new Error(data.errors[0]);
            }
            throw new Error(data.message || 'Registration failed');
        }

        setMessage('Registration successful!');
        setForm({ user_mail: '', user_pass: '' });
    
    } catch (error) {
        setMessage(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 text-center">
          Register
        </h1>

        {message && (
          <div
            className={`mb-4 rounded-md px-4 py-2 text-sm ${
              message.includes('successful')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="user_mail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="user_mail"
              type="email"
              name="user_mail"
              placeholder="Enter your email"
              value={form.user_mail}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="user_pass" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="user_pass"
              type="password"
              name="user_pass"
              placeholder="Enter your password"
              value={form.user_pass}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </main>
  );
}
