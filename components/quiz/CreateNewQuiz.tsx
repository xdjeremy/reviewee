import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { FC } from 'react';

const CreateNewQuiz: FC = () => {
	return (
		<div className='flex items-center justify-center'>
			<Link href={'/quiz/new'}>
				<div className='card h-52 w-96 cursor-pointer bg-primary text-primary-content shadow-md duration-150 hover:-translate-y-1'>
					<div className='card-body items-center text-center'>
						<h2 className='card-title'>Create New Quiz!</h2>
						<p>Get started with your new quiz.</p>
						<div className='card-actions justify-end'>
							<PlusCircleIcon className='h-20 w-20' />
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export { CreateNewQuiz };
