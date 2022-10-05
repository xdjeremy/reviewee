import Link from 'next/link';
import React, { FC } from 'react';
import { Title } from '../components/header';
import { RegisterForm } from '../components/register';

const Register: FC = () => {
	return (
		<div className='flex h-screen flex-col bg-gradient-to-b from-blue-800 to-green-700'>
			<Title color='dark' />
			<div className='mt-24 flex flex-col items-center justify-center'>
				<RegisterForm />
			</div>
			<Link href={'/login'}>
				<button className='absolute right-0 bottom-10 rounded-l-lg bg-white p-3 font-semibold'>
					Already have an account? Login
				</button>
			</Link>
		</div>
	);
};

export default Register;
