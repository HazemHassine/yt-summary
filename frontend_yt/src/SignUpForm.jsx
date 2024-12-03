import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./lib/firebase";
import { v4 as uuidv4 } from "uuid";

export default function SignUpForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signUp(email, password);
      console.log("userCredential", userCredential);
      const user = userCredential.user;

      // Create a user document in Firestore
      const userRef = doc(db, "users", user.uid); // Reference to the user document
      await setDoc(userRef, {
        email: user.email,
        name,
        bio,
        createdAt: new Date().toISOString(),
      });
      const articleId = uuidv4();

      const docPlaceholder = {
        createdAt: new Date().toISOString(),
        title: "Your first article",
        content: "#TODO add this later",
        description:
          "This is where a short description of the article will be seen. lorem du fact de la description of the article will be shown",
      };

      // Create a document with articleId within the "articles" collection
      await setDoc(doc(userRef, "articles", articleId), docPlaceholder);

      onClose();
    } catch (error) {
      // ignote this error
      if (error?.message === "undefined has no properties") {
        onClose();
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-96">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Bio (optional)
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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
  );
}
