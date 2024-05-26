'use client'

import { signIn, signUp } from "@/app/lib/auth";
import { useRouter, usePathname } from 'next/navigation'
import { montserrat, reddit_mono, open_sans } from "@/app/ui/fonts";
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '@/app/ui/auth/auth.module.scss'
import Link from "next/link";

type FormFields = {
	username: string,
	password: string
}

export default function SignIn() {
	const router = useRouter()
	const pathname = usePathname()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError
	} = useForm<FormFields>()

	const submit: SubmitHandler<FormFields> = async (data) => {
		try {
			const { username, password } = data
			const { accessToken } = await (pathname === '/auth/signin' ? signIn(username, password) : signUp(username, password))
			localStorage.setItem('accessToken', accessToken)
			router.replace('/dashboard/profile')
		} catch (err: any) {
			if (pathname === '/auth/signin') {
				if (err.message === 'Invalid password') {
					setError("password", { message: err.message })
				}
				else {
					setError("username", { message: err.message })
					setError("password", { message: 'Invalid password' })
				}
			}
			else {
				setError("username", { message: 'User already exists' })
			}
		}
	}

	return (
		<div className='min-h-screen flex justify-center items-center'>
			<form onSubmit={handleSubmit(submit)} className={`${styles.form} ${montserrat.variable} ${reddit_mono.variable}`} >
				<h1>{pathname === '/auth/signin' ? 'Sign In' : 'Sign Up'}</h1>
				<div className={`border-b-2 ${styles.box} ${errors.username ? 'border-red-500' : 'border-gray-300'}`}>
					<label htmlFor="username">Username</label>
					<i className="ri-user-line"></i>
					<input
						{...register('username', {
							required: 'Username is required',
							minLength: {
								value: 3,
								message: 'Username must be at least 3 characters'
							},
							maxLength: {
								value: 15,
								message: 'Username must be under 15 characters'
							}
						})}
						className={styles.input}
						type="text"
						name="username"
						placeholder="Type your username"
					/>
				</div>
				{errors.username && (<div className={`text-red-600 text-2xl mt-2 self-start pl-12 ${open_sans.className}`}>{errors.username?.message}</div>)}
				<div className={`border-b-2 ${styles.box} ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
					<label htmlFor="password">Password</label>
					<i className="ri-lock-line"></i>
					<input
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 5,
								message: 'Password must be at least 5 characters'
							},
							maxLength: {
								value: 30,
								message: 'Password must be under 30 characters'
							}
						})}
						className={styles.input}
						type="password"
						name="password"
						placeholder="Type your password"
					/>
				</div>
				{errors.password && (<div className={`text-red-600 text-2xl mt-2 self-start pl-12 ${open_sans.className}`}>{errors.password?.message}</div>)}
				<button disabled={isSubmitting} type="submit">Submit</button>
				{pathname === '/auth/signin' ?
					<Link href='/auth/signup' replace={true}>Sign Up</Link> :
					<Link href='/auth/signin' replace={true}>Sign In</Link>}
			</form>
		</div>
	);
}
