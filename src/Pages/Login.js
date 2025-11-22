import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/UserContext';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/products';

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      username: username ? '' : 'Username is required!',
      password: password ? '' : 'Password is required!',
    };

    if (!username || !password) {
      setErrors(newErrors);
      return;
    }

    const success = login(username, password);

    if (!success) {
      setErrors({
        username: 'Incorrect username or password!',
        password: 'Incorrect username or password!',
      });
      setUsername('');
      setPassword('');
    } else {
      setErrors({ username: '', password: '' });
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth]);

  return (
    <div className="min-h-[100vh] bg-blue-50">
      <div className="container mx-auto p-3 md:py-3">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center cursor-pointer gap-2 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded-full transition-all duration-300"
        >
          <FaArrowLeft className="text-xs" />
          Go Back
        </button>
      </div>

      <div className="flex justify-center flex-col items-center gap-5 px-4 sm:px-6 md:px-8 lg:px-10">
        <div>
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl pb-6 font-bold text-blue-900 leading-snug">
            Welcome back to CarePharma <br />
            <span className="text-blue-600">Login to continue your journey</span>
          </h1>
        </div>

        <div className="border rounded-lg shadow-md px-4 py-6 w-full max-w-md bg-white">
          <h3 className="text-center text-xl font-semibold text-blue-700 mb-4">Login</h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`border rounded w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.username ? 'border-red-400' : ''}`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border rounded w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.password ? 'border-red-400' : ''}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition mt-2 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>

        <div className="text-sm text-gray-700">
          Don’t have an account?{' '}
          <NavLink to="/" className="text-blue-600 hover:underline font-medium">
            Sign up here
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;