import { NextPage } from 'next';
import React from 'react';
import { ReivewPage } from '../../components/quiz';
import { ReviewProvider } from '../../components/quiz/review/Review.provider';

const QuizId: NextPage = () => {
	return (
		<>
			<ReviewProvider>
				<ReivewPage />
			</ReviewProvider>
		</>
	);
};

export default QuizId;
