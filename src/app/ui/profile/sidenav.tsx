'use client'

import { montserrat, reddit_mono } from '../fonts';
import Link from 'next/link';

export default function SideNav() {
	return (
		<div className={`flex flex-col min-h-full gap-2 w-60 ${reddit_mono.className}`}>
			<div className={`${montserrat.className} font-semibold cursor-default bg-blue-500 text-white text-3xl rounded-mdmb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40`}>
				TaskMaster
			</div>
			<nav className="rounded-xl text-lg flex flex-col gap-2">
				<Link href="/dashboard/profile" className="bg-gray-100 hover:bg-blue-200 hover:text-blue-700 cursor-pointer rounded-md p-3"><i className="ri-user-line"></i> Profile</Link>
				<Link href="/dashboard/users" className="bg-gray-100 hover:bg-blue-200 hover:text-blue-700 cursor-pointer rounded-md p-3"><i className="ri-group-line"></i> Users</Link>
				<Link href="/dashboard/tasks" className="bg-gray-100 hover:bg-blue-200 hover:text-blue-700 cursor-pointer rounded-md p-3" ><i className="ri-list-check-3"></i> Tasks</Link>
			</nav >
			<div className='hidden bg-gray-100 w-full rounded-md grow min-h-full md:block' />
			<Link href="/dashboard/settings" className="bg-gray-100 hover:bg-blue-200 hover:text-blue-700 cursor-pointer rounded-md p-3" ><i className="ri-settings-3-line"></i> Settings</Link>
		</div>
	);
}
