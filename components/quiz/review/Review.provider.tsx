import React, { createContext, useContext, useState } from 'react';

interface QuizItems {
	question: string;
	answer: string;
}

enum Action {
	PICKING,
	REVIEW,
	SHOW,
}

const ReviewContext = createContext({
	action: Action.PICKING,
	setAction: (_action: Action) => {},
	items: [
		{
			question: '',
			answer: '',
		},
	],
	setItems: (_items: QuizItems[]) => {},
	quizTitle: '',
	setQuizTitle: (_title: string) => {},
});

const useReview = () => {
	const context = useContext(ReviewContext);
	if (context === undefined) {
		throw new Error('useReview must be used within a ReviewProvider');
	}
	return context;
};

const ReviewProvider = ({ children }: any) => {
	const [action, setAction] = useState<Action>(Action.PICKING);
	const [items, setItems] = useState<QuizItems[]>([
		{
			question: '',
			answer: '',
		},
	]);
	const [quizTitle, setQuizTitle] = useState<string>('');

	return (
		<ReviewContext.Provider
			value={{
				action,
				setAction,
				items,
				setItems,
				quizTitle,
				setQuizTitle,
			}}>
			{children}
		</ReviewContext.Provider>
	);
};

export { ReviewProvider, useReview, Action };
