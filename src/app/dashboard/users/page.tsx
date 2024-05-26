'use client'

import { fetchUsers } from "@/app/lib/data";
import { User } from "@/app/lib/types";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fecthData = async () => {
      const accessToken = localStorage.getItem('accessToken') || ""
      const users: User[] = await fetchUsers(accessToken)
      setUsers(users)
    }

    fecthData()
  }, [])

  return (
    <div>
      <table className="text-start">
        <tr>
          <th className="text-start">Number</th>
          <th className="text-start">Users</th>
          <th className="text-start">Tasks</th>
        </tr>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>
              (<span className="text-green-600">{user.tasks?.filter(task => task.isCompleted === true).length}</span>/
              <span className="text-orange-600">{user.tasks?.filter(task => task.isCompleted === false).length}</span>)
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
