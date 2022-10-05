import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { classNames, supabase } from '../../utils';
import { TextInput } from '../form';

const RegisterForm: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	const handleRegister = async () => {
		try {
			setIsLoading(true);
			const { error } = await supabase.auth.signUp({
				email: getValues('email'),
				password: getValues('password'),
			});
			if (error) throw error;
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex w-full max-w-md flex-col items-center rounded-lg border-4 border-white bg-black px-5 py-32 shadow-lg shadow-black'>
			<h3 className='mt-3 text-2xl font-bold uppercase text-white'>Register</h3>
			<form
				onSubmit={handleSubmit(handleRegister)}
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
						minLength: {
							value: 6,
							message: 'Password must have at least 6 characters',
						},
					}}
					error={errors.password?.message}
					disabled={isLoading}
				/>
				<button
					type='submit'
					className={classNames(
						isLoading ? 'loading' : '',
						'btn btn-warning btn-block'
					)}
					disabled={isLoading}>
					{isLoading ? 'Loading' : 'Register'}
				</button>
			</form>
		</div>
	);
};

export { RegisterForm };
