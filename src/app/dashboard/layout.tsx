import React from 'react';
import SideNav from '@/app/ui/profile/sidenav';
import { open_sans } from '../ui/fonts';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-row">
			<section className='p-5 h-screen'>
				<SideNav />
			</section>
			<main className="flex flex-col p-5 h-screen w-full">
				{children}
			</main >
		</div >
	);
}
