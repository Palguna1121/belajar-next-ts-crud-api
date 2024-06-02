import axios from "axios";
import Datatable from "@/components/datatable";
import Link from "next/link";
import { Suspense } from "react";
import { Loading } from "@/components/loading";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await axios.get("http://localhost:8000/api/users");
    return res.data.result;
  } catch (err) {
    console.error("Failed to fetch users", err);
    return [];
  }
};

const Home = async () => {
  const users = await fetchUsers();

  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-4xl font-bold">CRUD NIH</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="mb-2 w-full text-right">
          <Link href="/users/create" className="btn btn-primary">
            Create Users
          </Link>
          <div className="overflow-x-auto">
            <Suspense fallback={<Loading />}>
              <Datatable users={users} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
