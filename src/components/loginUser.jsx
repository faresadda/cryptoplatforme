import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate=useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] p-4 py-8">
      <div className="w-full max-w-md bg-[#1e1e20] text-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Login
        </h2>
        <form className="space-y-6" onSubmit={(e)=>{e.preventDefault();navigate('/user')}}>
      <div>
        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          className="w-full p-2 bg-[rgb(73,73,73)] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          className="w-full p-2 bg-[rgb(73,73,73)] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your password"
        />
      </div>
      <p className="text-yellow-400 text-center w-full">Forgot password?</p>
      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </form>
    <p className="mt-6 text-center text-sm">
          Don't have an account?
          <button
            type="submit"
            className="text-yellow-400 hover:underline" onClick={()=>{navigate('/signup')}}
            
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
    );
  }
  