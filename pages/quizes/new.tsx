import { NextPage } from 'next';
import React, { ReactNode, useState } from 'react';
import { Layout } from '../../components/layout';
import { AddQuestion, QuizInput } from '../../components/quiz';
import { useForm } from 'react-hook-form';
import { useEffectOnce } from 'usehooks-ts';

// TODO: delete item

const NewQuiz: NextPage = () => {
	const [items, setItems] = useState<ReactNode[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();

	const addQuestion = () => {
		console.log(errors);
		setItems([
			...items,
			<QuizInput
				register={register}
				number={items.length + 1}
				key={items.length + 1}
				error={errors[`question${items.length + 1}`]}
			/>,
		]);
		console.log(items.length + 1);
	};

	const handleSave = () => {
		console.log(errors);
	};

	useEffectOnce(() => {
		addQuestion();
	});
	return (
		<Layout>
			<form
				onSubmit={handleSubmit(handleSave)}
				className='flex w-full flex-col items-center gap-5'>
				<span className='flex w-full justify-end'>
					<button type='submit' className='btn btn-info'>
						Save
					</button>
				</span>
				{items.map((item) => item)}
				<AddQuestion addQuestion={addQuestion} />
			</form>
		</Layout>
	);
};

export default NewQuiz;
