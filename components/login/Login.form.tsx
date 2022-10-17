import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { classNames, supabase } from '../../utils';
import { TextInput } from '../form';

const LoginForm: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const { error } = await supabase.auth.signInWithPassword({
				email: getValues('email'),
				password: getValues('password'),
			});
			if (error) throw error;
			toast.success('Successfully logged in!');
			router.push('/dashboard');
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='flex w-full max-w-md flex-col items-center rounded-lg border-4 border-black bg-white px-5 py-32'>
			<h3 className='mt-3 text-2xl font-bold uppercase'>Login</h3>
			<form
				onSubmit={handleSubmit(handleLogin)}
				className='mt-5 flex flex-col items-center'>
				<TextInput
					name='email'
					placeholder='Email'
					type='text'
					register={register}
					validationSchema={{
						required: {
							value: true,
							message: 'Email is required',
						},
						type: {
							value: 'email',
							message: 'Invalid email address',
						},
					}}
					error={errors.email?.message}
					disabled={isLoading}
				/>
				<TextInput
					name='password'
					placeholder='Password'
					type='password'
					register={register}
					validationSchema={{
						required: {
							value: true,
							message: 'Password is required',
						},
					}}
					error={errors.password?.message}
					disabled={isLoading}
				/>
				<button
					type='submit'
					className={classNames(
						isLoading ? 'loading' : '',
						'btn btn-info btn-block'
					)}>
					{isLoading ? 'Loading' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export { LoginForm };
