import { Task } from "@/app/lib/types"

export default function UserInterface({ userTasks }: { userTasks: Task[] }) {
	return (
		<div>
			<ul>
				<h1>Tasks:</h1>
				{userTasks.length === 0 ?
					(<p>No tasks available</p>) :
					(userTasks.map(task => (
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