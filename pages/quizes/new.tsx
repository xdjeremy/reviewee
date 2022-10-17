import { NextPage } from 'next';
import React, { createContext, ReactNode, useState } from 'react';
import { Layout } from '../../components/layout';
import { AddQuestion, QuizInput } from '../../components/quiz';
import { useForm } from 'react-hook-form';
import { useCounter, useEffectOnce } from 'usehooks-ts';
import { toast } from 'react-hot-toast';
import { classNames, supabase } from '../../utils';
import { useRouter } from 'next/router';

interface QuestionAndAnswer {
	question: string;
	answer: string;
	quiz: string;
}

interface Item {
	number: number;
	component: ReactNode;
}

export const NewQuizContext = createContext({
	items: [] as Item[],
	setItems(items: Item[]) {},
});

const NewQuiz: NextPage = () => {
	const { count, increment } = useCounter(1);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const [items, setItems] = useState<Item[]>([]);

	const addQuestion = () => {
		setItems([
			...items,
			{
				number: count,
				component: (
					<QuizInput
						register={register}
						number={count}
						key={count}
						error={errors[`question${count}`]}
					/>
				),
			},
		]);
		increment();
	};

	const handleSave = async () => {
		try {
			setIsLoading(true);

			if (items.length === 0) {
				throw new Error('Quiz is empty');
			}

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
				.select('id');
			if (quizError) throw quizError;

			const quizItems = items;
			let questionsAnswer: QuestionAndAnswer[] = [];
			quizItems.forEach((item) => {
				const question = getValues(`question${item.number}`);
				const answer = getValues(`answer${item.number}`);
				const quiz = quizData[0].id;
				questionsAnswer.push({ question, answer, quiz });
			});

			const { error } = await supabase
				.from('quiz_items')
				.insert(questionsAnswer);
			if (error) throw error;

			// success
			toast.success('Quiz created successfully');
			// TODO: redirect to quiz page
			router.push(`/quizes/${quizData[0].id}`);
		} catch (err: any) {
			console.log(err);
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	// useEffectOnce(() => {
	// 	addQuestion();
	// });
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
					<button
						type='submit'
						className={classNames(isLoading ? 'loading' : '', 'btn btn-info')}
						disabled={isLoading}>
						Save
					</button>
				</span>
				<NewQuizContext.Provider
					value={{
						items,
						setItems,
					}}>
					{items.map((item: Item) => item.component)}
				</NewQuizContext.Provider>
				<AddQuestion addQuestion={addQuestion} />
			</form>
		</Layout>
	);
};

export default NewQuiz;
