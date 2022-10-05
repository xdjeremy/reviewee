import React, { FC } from 'react';
import { classNames } from '../../utils';

interface Props {
	color: 'dark' | 'light';
}

// TODO: text stroke

const Title: FC<Props> = ({ color }) => {
	return (
		<div
			className={classNames(
				color === 'dark' ? 'bg-black' : 'bg-white',
				'mt-2 flex h-14 w-full items-center justify-center'
			)}>
			<h1
				className={classNames(
					color === 'dark' ? 'text-white' : '',
					'text-center text-4xl uppercase'
				)}>
				Reviwee
			</h1>
		</div>
	);
};

export { Title };
