import { NextPage } from 'next';
import React from 'react';
import { Layout } from '../../components/layout';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Quizes: NextPage = () => {
	return (
		<Layout>
			{/* if no quiz yet */}
			<div className='flex items-center justify-center'>
				<Link href={'/quizes/new'}>
					<div className='card w-96 cursor-pointer bg-base-100 text-base-content shadow-md duration-150 hover:-translate-y-1'>
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
		</Layout>
	);
};

export default Quizes;
