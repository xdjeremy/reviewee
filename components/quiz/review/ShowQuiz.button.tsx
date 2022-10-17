import { EyeIcon } from '@heroicons/react/24/outline';
import React, { FC } from 'react';
import { Action, useReview } from './Review.provider';

const ShowQuizButton: FC = () => {
	const { setAction } = useReview();
	return (
		<button
			onClick={() => setAction(Action.SHOW)}
			className='flex items-center justify-center'>
			<div className='card h-52 w-96 cursor-pointer bg-base-100 text-base-content shadow-md duration-150 hover:-translate-y-1'>
				<div className='card-body items-center text-center'>
					<h2 className='card-title'>Show quiz items</h2>
					<p>Review the quiz items.</p>
					<div className='card-actions justify-end'>
						{/* <PlusCircleIcon className='h-20 w-20' /> */}
						<EyeIcon className='h-20 w-20' />
					</div>
				</div>
			</div>
		</button>
	);
};

export { ShowQuizButton };
