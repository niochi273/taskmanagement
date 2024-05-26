import { refreshAccessToken } from "@/app/lib/auth"
import { fetchUserTasks } from "@/app/lib/data"
import { Task } from "@/app/lib/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserInterface() {
	const [userTasks, setUserTasks] = useState<Task[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (!accessToken) return router.replace('/auth/signin')
				const userTasks = await fetchUserTasks(accessToken)
				setUserTasks(userTasks)
			} catch {
				const { accessToken } = await refreshAccessToken()
				const userTasks = await fetchUserTasks(accessToken)
				setUserTasks(userTasks)
			}
		}

		fetchData()
	}, [router])


	return (
		<div>
			<ul>
				<h1>Tasks:</h1>
				{userTasks?.length === 0 ?
					(<p>No tasks available</p>) :
					(userTasks?.map(task => (
						<li key={task.id}>
							<div>Title: {task.title}</div>
							{task.description ? (<h2>Description: {task.description}</h2>) : null}
							<div>Priority: {task.priority}</div>
							<div>Is completed: {task.isCompleted ? 'False' : 'True'}</div>
						</li>
					)))
				}
			</ul>
		</div>
	)
}