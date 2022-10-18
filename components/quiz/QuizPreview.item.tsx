import Link from 'next/link';
import React, { FC } from 'react';

interface QuizPreviewItemProps {
	id: string;
	title: string;
	description: string;
}

const QuizPreviewItem: FC<QuizPreviewItemProps> = ({
	id,
	title,
	description,
}) => {
	return (
		<div className='flex items-center justify-center'>
			<Link href={`/quiz/${id}`}>
				<div className='card h-52 w-96 cursor-pointer bg-base-100 text-base-content shadow-md duration-150 hover:-translate-y-1'>
					<div className='card-body flex items-center justify-center text-center'>
						<h2 className='card-title'>{title}</h2>
						<p className='flex h-fit items-center justify-center'>
							{description}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export { QuizPreviewItem };
