import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
	return (
		<div className='bg-header bg-cover bg-fixed p-6 leading-normal tracking-normal text-indigo-400'>
			<div className='h-full'>
				<div className='container mx-auto w-full'>
					<div className='flex w-full items-center justify-between'>
						<a
							className='flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl'
							href='#'>
							Review
							<span className='bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent'>
								ee
							</span>
						</a>

						<div className='flex w-1/2 content-center justify-end'>
							<a
								className='hover:text-underline inline-block h-10 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-pink-500 md:h-auto md:p-4'
								href='https://twitter.com/intent/tweet?url=#'>
								<svg
									className='h-6 fill-current'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 32 32'>
									<path d='M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z'></path>
								</svg>
							</a>
							<a
								className='hover:text-underline inline-block h-10 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-pink-500 md:h-auto md:p-4'
								href='https://www.facebook.com/sharer/sharer.php?u=#'>
								<svg
									className='h-6 fill-current'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 32 32'>
									<path d='M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z'></path>
								</svg>
							</a>
						</div>
					</div>
				</div>

				<div className='container mx-auto flex flex-col flex-wrap items-center pt-8 md:flex-row md:pt-5'>
					<div className='flex w-full flex-col justify-center overflow-y-hidden lg:items-start xl:w-2/5'>
						<h1 className='my-4 text-center text-3xl font-bold leading-tight text-white opacity-75 md:text-left md:text-5xl'>
							Studying{' '}
							<span className='bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent'>
								Just Got Easier
							</span>
						</h1>
						<p className='mb-8 text-center text-base leading-normal md:text-left md:text-2xl'>
							<span className='bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent'>
								Automagically
							</span>{' '}
							create review quiz from your professor&apos;s PowerPoint
							presentation.
						</p>

						<div>
							<button
								className='transform rounded bg-gradient-to-r from-purple-800 to-green-500 py-2 px-4 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:from-pink-500 hover:to-green-500 focus:ring'
								type='button'>
								Get Started
							</button>
						</div>
					</div>

					<div className='w-full overflow-hidden p-12 xl:w-3/5'>
						<Image
							src={'/macbook.svg'}
							className={
								'mx-auto w-full -rotate-6 transform transition duration-700 ease-in-out hover:rotate-6 hover:scale-105 md:w-4/5'
							}
							width={1000}
							height={1000}
							alt='macbook'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
