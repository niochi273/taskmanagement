'use client';

import { fetchProfile } from "@/app/lib/profile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserInterface from "@/app/ui/profile/user";
import { AdminProfileInterface } from "@/app/ui/profile/admin";
import { refreshAccessToken } from "@/app/lib/auth";
import ProfileHeader from "@/app/ui/profile/header";

export default function Profile() {
  const [username, setUsername] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const router = useRouter();

  const fecthData = async (accessToken: string) => {
    try {
      const { username, isAdmin } = await fetchProfile(accessToken);
      setUsername(username);
      setAdmin(isAdmin);
    } catch (error: any) {
      throw new Error(error.message);
    }
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
      <ProfileHeader username={username} />

      <section className="flex flex-row justify-end">
        {admin ? <AdminProfileInterface /> : <UserInterface />}
      </section>
    </>
  );
}
