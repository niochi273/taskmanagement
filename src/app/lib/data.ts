export const fetchUsers = async (accessToken: string) => {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export const fetchUserTasks = async (accessToken: string) => {
  const response = await fetch(`http://localhost:3000/tasks/user`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export const fetchTasks = async (accessToken: string) => {
  const response = await fetch(`http://localhost:3000/tasks`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export const finishTask = async (accessToken: string, taskId: string) => {
  const response = await fetch(`http://localhost:3000/tasks/deleteTask`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskId })
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}
