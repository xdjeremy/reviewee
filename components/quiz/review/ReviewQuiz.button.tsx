import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import React, { FC } from 'react';
import { Action, useReview } from './Review.provider';

const ReviewQuizButton: FC = () => {
	const { setAction } = useReview();

	return (
		<button
			onClick={() => setAction(Action.REVIEW)}
			className='flex items-center justify-center'>
			<div className='card h-52 w-96 cursor-pointer bg-base-100 text-base-content shadow-md duration-150 hover:-translate-y-1'>
				<div className='card-body items-center text-center'>
					<h2 className='card-title'>Review Quiz</h2>
					<p>Study with flashcards.</p>
					<div className='card-actions justify-end'>
						<ClipboardDocumentListIcon className='h-20 w-20' />
					</div>
				</div>
			</div>
		</button>
	);
};

export { ReviewQuizButton };
