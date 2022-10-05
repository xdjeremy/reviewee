import { NextPage } from 'next';
import React, { ReactNode, useState } from 'react';
import { Layout } from '../../components/layout';
import { AddQuestion, QuizInput } from '../../components/quiz';
import { useForm } from 'react-hook-form';
import { useEffectOnce } from 'usehooks-ts';
import { toast } from 'react-hot-toast';
import { classNames, supabase } from '../../utils';

// TODO: delete item
// TODO; redirect logged out users using the layout

interface QuestionAndAnswer {
	question: string;
	answer: string;
	quiz: string;
}

const NewQuiz: NextPage = () => {
	const [items, setItems] = useState<ReactNode[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();

	const addQuestion = () => {
		setItems([
			...items,
			<QuizInput
				register={register}
				number={items.length + 1}
				key={items.length + 1}
				error={errors[`question${items.length + 1}`]}
			/>,
		]);
	};

	const handleSave = async () => {
		try {
			const {
				data: { user },
				error: userError,
			} = await supabase.auth.getUser();
			if (userError) throw userError;

			const { data: quizData, error: quizError } = await supabase
				.from('quiz')
				.insert({
					owner: user?.id,
					title: getValues('title'),
				})
				.select('uuid');
			if (quizError) throw quizError;

			const questionsAnswer: QuestionAndAnswer[] = [];
			for (let i = 1; i <= items.length; i++) {
				questionsAnswer.push({
					question: getValues(`question${i}`),
					answer: getValues(`answer${i}`),
					quiz: quizData[0].uuid,
				});
			}

			const { error } = await supabase
				.from('quiz_items')
				.insert(questionsAnswer);
			if (error) throw error;
		} catch (err: any) {
			console.log(err);
			toast.error(err.message);
		}
	};

	useEffectOnce(() => {
		addQuestion();
	});
	return (
		<Layout>
			<form
				onSubmit={handleSubmit(handleSave)}
				className='mx-auto flex w-full max-w-7xl flex-col items-center gap-5'>
				<p className='w-full text-left italic text-red-500'>
					{errors.title?.message as string}
				</p>
				<span className='flex w-full flex-col justify-between gap-2 sm:flex-row'>
					<input
						type='text'
						placeholder='Quiz Title'
						{...register('title', {
							required: 'Title is required',
							minLength: {
								value: 5,
								message: 'Title must be at least 5 characters',
							},
							maxLength: {
								value: 50,
								message: 'Title must be at most 50 characters',
							},
						})}
						className={classNames(
							errors.title?.message ? 'input-error' : '',
							'input input-bordered w-full max-w-lg'
						)}
					/>
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
