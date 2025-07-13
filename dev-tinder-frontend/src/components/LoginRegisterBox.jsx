import  { useState } from 'react';

const LoginRegisterBox = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full transition duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {isLogin ? 'Welcome Back' : 'Join DevPitch'}
      </h2>
      <form className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="text-center text-sm mt-4 text-gray-600">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default LoginRegisterBox;
