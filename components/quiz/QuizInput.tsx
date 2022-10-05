import { TrashIcon } from '@heroicons/react/24/outline';
import React, { FC } from 'react';

interface Props {
	register: any;
	number: number;
	error: any;
}

const QuizInput: FC<Props> = ({ register, number, error }) => {
	return (
		<div className='card w-full max-w-7xl cursor-pointer bg-base-100 text-base-content shadow-md'>
			<div className='card-body w-full items-center text-center '>
				<h3>Question {number}</h3>
				<span className='absolute top-5 right-5'>
					<TrashIcon className='h-6 w-6 duration-150 hover:-translate-y-1' />
				</span>
				<div className='flex w-full flex-col items-center justify-center lg:flex-row lg:gap-2'>
					<div className='form-control w-full max-w-xl'>
						<label className='label'>
							<span className='label-text'>Question</span>
							<span className='label-text-alt text-red-500'>
								{error?.message}
							</span>
						</label>
						<input
							type='text'
							name={`question${number}`}
							placeholder='Type here'
							className='input input-bordered w-full max-w-xl'
							{...register(`question${number}`, {
								required: {
									value: true,
									message: 'Question is required',
								},
								maxLength: {
									value: 100,
									message: 'Question must be less than 100 characters',
								},
							})}
						/>
					</div>
					<div className='form-control w-full max-w-xl'>
						<label className='label'>
							<span className='label-text'>Answer</span>
							<span className='label-text-alt text-red-500'>
								{error?.message}
							</span>
						</label>
						<input
							type='text'
							name={`answer${number}`}
							placeholder='Type here'
							className='input input-bordered w-full max-w-xl'
							{...register(`answer${number}`, {
								required: {
									value: true,
									message: 'Answer is required',
								},
								maxLength: {
									value: 100,
									message: 'Answer must be less than 200 characters',
								},
							})}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { QuizInput };
