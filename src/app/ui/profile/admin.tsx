import { User, Task } from '@/app/lib/types';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MyChart from '@/app/ui/profile/chart';
import { montserrat, open_sans } from '../fonts';

interface AdminProps {
	users: User[],
	tasks: Task[],
}

export const AdminProfileInterface: React.FC<AdminProps> = ({ users, tasks }) => {
	const sortedUsers = users.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);
	const sortedTasks = tasks.filter(task => task.isCompleted === true).sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()).slice(0, 5);

	return (
		<div className='flex flex-col items-center h-full gap-4 w-3/5' style={{ minWidth: '800px' }}>
			<div className='flex flex-row w-full h-1/2 gap-4'>
				<section className={`p-6 flex flex-col w-full ${open_sans.className}`} style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
					<div className='mb-4 border-b flex flex-row justify-between pr-2 items-center'>
						<h2 className={`${montserrat.className} text-2xl font-semibold`}>Recently updated users:</h2>
						<i className="ri-loop-right-fill text-gray-300 text-3xl"></i>
					</div>
					<div className='flex flex-col pt-2'>
						{sortedUsers.map(user => (
							<div key={user.id} className='text-2xl mb-3 flex flex-row items-center min-h-10'>
								<Image className="hidden md:block rounded-full mr-3" src='/default-pfp.png' alt="default profile picture" width={40} height={40} />
								<Link href='/dashboard/users' className='truncate text-nowrap'>{user.username}</Link>
								<div className='text-center w-16 ml-auto'>
									(<span className='text-orange-400'>{user.tasks ? user.tasks.filter(task => !task.isCompleted).length : 0}</span>
									/
									<span className='text-green-500'>{user.tasks ? user.tasks.filter(task => task.isCompleted).length : 0}</span>)
								</div>
							</div>
						))}
					</div>
				</section>

				<section className={`p-6 flex flex-col w-full ${open_sans.className}`} style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
					<div className='mb-4 border-b flex flex-row justify-between pr-2 items-center'>
						<h2 className={`${montserrat.className} text-2xl font-semibold`}>Completed tasks:</h2>
						<i className="ri-checkbox-fill text-green-600 text-3xl"></i>
					</div>
					<div className='flex flex-col pt-2'>
						{sortedTasks.map(task => (
							<div key={task.id} className='h-10 text-2xl mb-3 flex flex-row justify-between items-center pr-2'>
								<div className='truncate'>• {task.title}</div>
								<Link href='/dashboard/tasks'><i className="ri-arrow-right-line text-blue-400 transition-colors hover:text-blue-600 text-3xl"></i></Link>
							</div>
						))}
					</div>
				</section>
			</div>
			<div className="flex h-1/2 w-full justify-center items-center bg-white border shadow-inner rounded-2xl px-12 py-5">
				<MyChart />
			</div>

		</div>
	);
};
