import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../../utils';
import { Layout } from '../../layout';
import { Action, useReview } from './Review.provider';
import { ReviewQuizButton } from './ReviewQuiz.button';
import { ShowQuizButton } from './ShowQuiz.button';

const ReivewPage: FC = () => {
	const { setQuizTitle, setItems, quizTitle, action } = useReview();
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		const fetchQuiz = async () => {
			try {
				if (id === undefined) return;
				const {
					data,
					error,
				}: {
					data: any;
					error: any;
				} = await supabase
					.from('quiz_items')
					.select(`question, answer, quiz(title)`)
					.eq('quiz', id);

				if (error) throw error;

				setQuizTitle(data[0].quiz?.title);
				setItems(data);
			} catch (err: any) {
				console.error(err);
				toast.error(err.message);
			}
		};
		fetchQuiz();
	}, [setItems, setQuizTitle, id]);

	const renderPage = () => {
		switch (action) {
			case Action.PICKING:
				return (
					<div className='mx-auto flex w-full flex-col justify-center gap-5 lg:flex-row'>
						<ReviewQuizButton />
						<ShowQuizButton />
					</div>
				);
			case Action.REVIEW:
				return <div>Review</div>;
			case Action.SHOW:
				return <div>Show</div>;
		}
	};

	return (
		<Layout>
			<h2 className='mx-auto mb-7 w-full text-center text-4xl'>{quizTitle}</h2>
			{renderPage()}
		</Layout>
	);
};

export { ReivewPage };
