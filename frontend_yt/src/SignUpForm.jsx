import React, { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from './lib/firebase'

export default function SignUpForm({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signUp(email, password)
      const user = userCredential.user
      
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString()
      })

      onClose()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-96">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 font-bold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

