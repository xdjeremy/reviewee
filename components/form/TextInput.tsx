import React, { FC } from 'react';
import { classNames } from '../../utils';

interface Props {
	error?: any;
	name: string;
	type: 'text' | 'password' | 'email';
	value?: string;
	placeholder: string;
	register?: any;
	validationSchema?: any;
	disabled?: boolean;
}

const TextInput: FC<Props> = ({
	error,
	name,
	type,
	value,
	placeholder,
	register,
	validationSchema,
	disabled,
}) => {
	return (
		<div className='form-control w-full max-w-xs'>
			<input
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				className={classNames(
					error ? 'input-error' : '',
					'input input-bordered w-full max-w-xs'
				)}
				disabled={disabled}
				{...register(name, validationSchema)}
			/>
			<label className='label'>
				<span className='label-text-alt text-red-500'>{error}</span>
			</label>
		</div>
	);
};

export { TextInput };
