import type { NextPage } from 'next';
import { Title } from '../components/header';
import { Button } from '../components/landing';

const Home: NextPage = () => {
	return (
		<div className='flex h-screen flex-col bg-gradient-to-bl from-blue-500 to-green-600'>
			<Title color='dark' />
			<div className='mt-10 flex flex-col items-center gap-7'>
				<Button text='login' href='/login' />
				<Button text='register' href='/register' />
			</div>
		</div>
	);
};

export default Home;
