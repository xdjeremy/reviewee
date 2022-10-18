import { NextPage } from 'next';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useEffectOnce } from 'usehooks-ts';
import { Layout } from '../../components/layout';
import { CreateNewQuiz, QuizPreviewItem } from '../../components/quiz';
import { supabase } from '../../utils';

interface Quiz {
	id: string;
	title: string;
}

const Quizzes: NextPage = () => {
	const [quiz, setQuiz] = useState<Quiz[]>();

	useEffectOnce(() => {
		const fetchQuizzes = async () => {
			const {
				data: { user: userData },
			} = await supabase.auth.getUser();
			const { data, error } = await supabase
				.from('quiz')
				.select('*')
				.order('created_at', { ascending: false })
				.eq('owner', userData?.id);
			if (error) {
				toast.error(error.message);
			}
			setQuiz(data!);
		};
		fetchQuizzes().then(r => r);
	});

	return (
		<Layout>
			<div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
				{quiz &&
					quiz.map((q) => (
						<QuizPreviewItem
							key={q.id}
							id={q.id}
							title={q.title}
							description={'test desc'}
						/>
					))}

				{/* if there are no quiz yet */}
				<CreateNewQuiz />
			</div>
		</Layout>
	);
};

export default Quizzes;
