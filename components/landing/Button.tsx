import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
	text: string;
	href: string;
}

const Button: FC<Props> = ({ text, href }) => {
	return (
		<Link href={href}>
			<button className='h-12 w-40 rounded-lg border-4 border-black bg-white uppercase text-black shadow-lg shadow-blue-700 duration-150 hover:-translate-y-1'>
				{text}
			</button>
		</Link>
	);
};

export { Button };
