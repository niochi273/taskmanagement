export type Task = {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  priority: Priority
  isCompleted: Boolean
  userId: string
}

export type User = {
  id: string
  username: string
  tasks?: Task[]
  updatedAt: string
  isAdmin: boolean
}

enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}
