import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { Title } from '../components/header';
import { LoginForm } from '../components/login';
import { supabase } from '../utils';

const Login: NextPage = () => {
	const router = useRouter();

	useEffectOnce(() => {
		const checkLogin = async () => {
			const { data } = await supabase.auth.getSession();
			if (data.session !== null) {
				router.push('/dashboard');
				return null;
			}
		};
		checkLogin();
	});
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
