"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const UpdateUserPage = () => {
  const { id } = useParams();

  const [userField, setUserField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${id}`);
      console.log(response.data.users);
      setUserField({
        name: response.data.users.name,
        email: response.data.users.email,
        password: "",
      });
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch user", err);
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };

  const changeUserFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!userField.name || !userField.email || !userField.password) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/users/update/${id}`, userField);
      setUserField({
        name: "",
        email: "",
        password: "",
      });
      window.location.href = "/";
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Something went wrong", err);
    }
  };

  if (loading) {
    return (
      <div className="w-screen pt-8 py-10 flex justify-center flex-col items-center">
        <h1 className="text-2xl text-center mb-2">Edit User</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col justify-center">
          <div className="mx-auto mb-3 mt-2">
            <span className="loading loading-dots loading-lg"></span>
          </div>
          <div className="mx-auto mb-3">
            <span className="loading loading-dots loading-lg"></span>
          </div>
          <div className="mx-auto mb-3">
            <span className="loading loading-dots loading-lg"></span>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Update
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-screen pt-8 py-10 flex justify-center flex-col items-center">
      <h1 className="text-2xl text-center mb-2">Edit User</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmitChange} className="flex flex-col justify-center">
        <input type="hidden" name="id" id="id" value={id} />
        <div className="mb-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" name="name" id="name" placeholder="Name" value={userField.name} onChange={changeUserFieldHandler} />
          </label>
        </div>
        <div className="mb-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" className="grow" name="email" id="email" placeholder="Email" value={userField.email} onChange={changeUserFieldHandler} />
          </label>
        </div>
        <div className="mb-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="password" className="grow" name="password" id="password" placeholder="Password" value={userField.password} onChange={changeUserFieldHandler} />
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserPage;
