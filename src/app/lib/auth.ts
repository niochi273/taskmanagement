const url = 'http://localhost:3000/auth'

export const signIn = async (username: string, password: string) => {
  const response = await fetch(`${url}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include'
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export const signUp = async (username: string, password: string) => {
  const response = await fetch(`${url}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include'
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export const refreshAccessToken = async () => {
  const response = await fetch(`${url}/refreshToken`, {
    method: 'GET',
    credentials: 'include'
  })

  const data = await response.json()
  if (!response) throw new Error(data.message)
  return data
}

export const commitLogout = async () => {
  await fetch(`${url}/logout`, {
    method: 'GET',
    credentials: 'include'
  })
}
