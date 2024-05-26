'use client';

import { fetchProfile } from "@/app/lib/profile";
import { fetchTasks, fetchUsers } from "@/app/lib/data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserInterface from "@/app/ui/profile/user";
import { AdminProfileInterface } from "@/app/ui/profile/admin";
import { Task, User } from "@/app/lib/types";
import { commitLogout, refreshAccessToken } from "@/app/lib/auth";
import { montserrat, open_sans } from "@/app/ui/fonts";
import Image from "next/image";

export default function Profile() {
  const [username, setUsername] = useState<string>("");
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [admin, setAdmin] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const fecthData = async (accessToken: string) => {
    try {
      const { username, userTasks, isAdmin } = await fetchProfile(accessToken);
      setUsername(username);
      setAdmin(isAdmin);
      if (isAdmin) {
        const [fetchedUsers, fetchedTasks] = await Promise.all([
          fetchUsers(accessToken),
          fetchTasks(accessToken)
        ]);
        setUsers(fetchedUsers);
        setTasks(fetchedTasks);
      }
      else setUserTasks(userTasks);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await commitLogout();
    localStorage.removeItem('accessToken');
    router.replace("/");
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return router.replace('/auth/signin');
        await fecthData(accessToken);
      } catch {
        try {
          const { accessToken } = await refreshAccessToken();
          localStorage.setItem('accessToken', accessToken);
          await fecthData(accessToken);
        } catch {
          router.replace("/auth/signin");
        }
      }
    };

    getProfile();
  }, [router]);

  if (!username) return null;

  return (
    <>
      <section className="flex flex-row items-center border border-lightgray rounded-lg p-4 px-6 h-40 mb-5">
        <Image className="hidden md:block rounded-full mr-3" src='/default-pfp.png' alt="default profile picture" width={100} height={100} />
        <div className="flex flex-col gap-5 items-start">
          <div className={`font-semibold text-3xl ${montserrat.className}`}>{username}</div>
          <button onClick={logout} className={`text-lg hover:text-blue-500 transition-colors ${open_sans.className}`}><i className="ri-logout-box-r-line"></i> Sign Out</button>
        </div>
      </section>

      <section className="flex flex-row flex-grow justify-end">
        {admin ?
          <AdminProfileInterface users={users} tasks={tasks} /> :
          <UserInterface userTasks={userTasks} />
        }
      </section>
    </>
  );
}
