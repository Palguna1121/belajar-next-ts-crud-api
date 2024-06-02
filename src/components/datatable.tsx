"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface DatatableProps {
  users: User[];
}

const Datatable = ({ users }: DatatableProps) => {
  const [userList, setUserList] = useState(users);

  const handleDelete = async (id: number) => {
    const isConfirmed = confirm("Yakin ingin delete?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8000/api/users/delete/${id}`);
      setUserList(userList.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  if (!Array.isArray(userList) || userList.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Create At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user, index) => (
          <tr key={user.id}>
            <th>{index + 1}</th>
            <td>{user.name ?? "--"}</td>
            <td>{user.email ?? "--"}</td>
            <td>{user.created_at ?? "--"}</td>
            <td className="flex justify-center gap-1 py-3">
              <Link className="btn btn-warning btn-outline" href={`/users/edit/${user.id}`}>
                edit
              </Link>
              <button className="btn btn-error btn-outline" onClick={() => handleDelete(user.id)}>
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Datatable;
