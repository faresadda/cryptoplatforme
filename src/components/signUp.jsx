import { useNavigate } from "react-router-dom"

export default function SignUp() {
  const navigate=useNavigate()
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
            Sign Up
          </h2>
          <form className="space-y-6">
      <div>
        <label className="block mb-2 text-sm">Username</label>
        <input
          type="text"
          className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded"
      >
        Sign Up
      </button>
    </form>
    <p className="mt-6 text-center text-sm">
          Already have an account?
          <button
            className="text-yellow-400 hover:underline" onClick={()=>{navigate('/login')}}
            
          >
            Login
          </button>
        </p>
      </div>
    </div>
    )}