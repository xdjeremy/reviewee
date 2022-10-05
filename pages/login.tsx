import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Title } from '../components/header';
import { LoginForm } from '../components/login';

const Login: NextPage = () => {
	return (
		<div className='flex h-screen flex-col bg-gradient-to-b from-purple-800 to-orange-700'>
			<Title color='light' />
			<div className='mt-24 flex flex-col items-center justify-center'>
				<LoginForm />
			</div>
			<Link href={'/register'}>
				<button className='absolute right-0 bottom-10 rounded-l-lg bg-black p-3 font-semibold text-white'>
					Don&apos;t have an account? Register
				</button>
			</Link>
		</div>
	);
};

export default Login;
