import { useNavigate } from "react-router-dom"

export default function SignUp() {
  const navigate=useNavigate()
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] p-4">
        <div className="w-full max-w-md bg-[#1e1e20] text-white px-8 py-4 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
            Sign up
          </h2>
          <form className="space-y-3">
      <div>
        <label className="block mb-2 text-sm">Username</label>
        <input
          type="text"
          className="w-full p-2 bg-[rgb(73,73,73)] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          className="w-full p-2 bg-[rgb(73,73,73)] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your email"
        />
      </div>
      <div className="relative">
        <label className="block mb-2 text-sm">Verification Code</label>
        <input
          type="email"
          className="w-full p-2 bg-[rgb(73,73,73)] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your verification code"
        />
        <p className="absolute bottom-2 right-2 text-yellow-400">Get code</p>
      </div>
      <div>
        <label className="block mb-2 text-sm">Invitaion Code (Optional)</label>
        <input
          type="email"
          className="w-full p-2 bg-[rgb(73,73,73)] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your invitaion code"
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
      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded"
      >
        Sign Up
      </button>
    </form>
    <div className="flex items-center justify-center gap-5 mt-3">
      <input
          type="checkbox"
        />
      <label className="block text-sm">Agree user services agrements</label>
    </div>
        
    <p className="mt-3 text-center text-sm">
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