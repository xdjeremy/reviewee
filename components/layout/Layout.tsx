import Link from 'next/link';
import React, { FC, useState } from 'react';

const Links = [
	{
		name: 'Dashboard',
		href: '/dashboard',
	},
	{
		name: 'Quizes',
		href: '/quizes',
	},
	{
		name: 'Logout',
		href: '/logout',
	},
];

const Layout = ({ children }: any) => {
	return (
		<div className='drawer'>
			<input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content flex flex-col'>
				<div className='navbar w-full bg-base-300'>
					<div className='flex-none lg:hidden'>
						<label htmlFor='my-drawer-3' className='btn btn-ghost btn-square'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='inline-block h-6 w-6 stroke-current'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'></path>
							</svg>
						</label>
					</div>
					<div className='mx-2 flex-1 px-2'>
						<h3 className='my-4 bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-center text-xl font-bold uppercase text-transparent'>
							Reviewee
						</h3>
					</div>
					<div className='hidden flex-none lg:block'>
						<ul className='menu menu-horizontal'>
							{/* <!-- Navbar menu content here --> */}
							{Links.map((link) => (
								<li key={link.name}>
									<Link href={link.href}>
										<a>{link.name}</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				{/* <!-- Page content here --> */}
				<div className='h-screen bg-gray-100 p-10'>{children}</div>
			</div>
			<div className='drawer-side'>
				<label htmlFor='my-drawer-3' className='drawer-overlay'></label>
				<ul className='menu w-80 overflow-y-auto bg-base-100 p-4'>
					{Links.map((link) => (
						<li key={link.name}>
							<Link href={link.href}>
								<a>{link.name}</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export { Layout };
