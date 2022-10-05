import { PlusIcon } from '@heroicons/react/24/outline';
import React, { FC } from 'react';

interface Props {
	addQuestion: () => void;
}

const AddQuestion: FC<Props> = ({ addQuestion }) => {
	return (
		<button
			onClick={addQuestion}
			className='card w-full max-w-7xl cursor-pointer bg-base-100 text-base-content duration-150 hover:-translate-y-1'>
			<div className='card-body w-full items-center text-center '>
				<h3 className='text-lg font-semibold'>Add Question</h3>
				<PlusIcon className='h-6 w-6' />
			</div>
		</button>
	);
};

export { AddQuestion };
