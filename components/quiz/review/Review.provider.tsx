import React, { createContext, useContext, useState } from 'react';

export interface QuizItems {
	question: string;
	answer: string;
}

interface Answer {
	question: string;
	answer: string;
	correctAnswer: string;
	isCorrect: boolean;
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

	score: 0,
	setScore: (_score: number) => {},
	quizItem: [{
		question: '',
		answer: '',
	}],
	setQuizItem: (_quizItem: QuizItems[]) => {},

	answers: [{
		question: '',
		answer: '',
		correctAnswer: '',
		isCorrect: false,
	}],
	setAnswers: (_answers: Answer[]) => {},
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

	const [ score, setScore ] = useState<number>(0);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [quizItem, setQuizItem] = useState(items)

	const [ answers, setAnswers ] = useState<Answer[]>([]);


	const randomizeQuiz = () => {
		setQuizItem(items.sort(() => Math.random() - 0.5))
	}

	return (
		<ReviewContext.Provider
			value={{
				action,
				setAction,
				items,
				setItems,
				quizTitle,
				setQuizTitle,
				score,
				setScore,
				quizItem,
				setQuizItem,
				answers,
				setAnswers,
			}}>
			{children}
		</ReviewContext.Provider>
	);
};

export { ReviewProvider, useReview, Action };
