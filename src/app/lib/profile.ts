export const fetchProfile = async (accessToken: string) => {
  const response = await fetch(`http://localhost:3000/profile`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}
