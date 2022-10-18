import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { QuizItems, useReview } from "./Review.provider";
import { useEffectOnce } from "usehooks-ts";
import FlashcardQuestionItem from "./FlashcardQuestion.item";
import FlashcardAnswerButton from "./FlashcardAnswer.button";
import FlashCardResultPage from "./FlashcardResult.page";

const FlashcardPage: FC = () => {
  const { items, setQuizItem, quizItem, setScore, score, setAnswers, answers } =
    useReview();
  const [currentQuestion, setCurrentQuestion] = useState<QuizItems>({
    question: "",
    answer: "",
  });

  const [answer, setAnswer] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);

  const [showResult, setShowResult] = useState<boolean>(false);

  const getQuestion = () => {
    const question = quizItem[0];
    //    remove the question from the array
    setQuizItem(quizItem.filter((item) => item !== question));
    setCurrentQuestion(question);

    // set the answers
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomIndex2 = Math.floor(Math.random() * items.length);
    const randomIndex3 = Math.floor(Math.random() * items.length);
    const correctAnswer = question.answer;
    const choicesArray = [
      items[randomIndex].answer,
      items[randomIndex2].answer,
      items[randomIndex3].answer,
      correctAnswer,
    ];
    // randomize the choices
    const randomizedChoices = choicesArray.sort(() => Math.random() - 0.5);
    setChoices(randomizedChoices);
  };

  useEffectOnce(() => {
    //	randomize the items
    getQuestion();
  });

  const answerClickHandler = (answer: string) => {
    setAnswer(answer);
    return void 0;
  };

  const onNext = () => {
    // add the result to the answers array
    const result = {
      question: currentQuestion.question,
      answer: answer,
      correctAnswer: currentQuestion.answer,
      isCorrect: answer === currentQuestion.answer,
    };
    setAnswers([...answers, result]);

    //    check if the answer is correct
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
    //    if there are no more questions, go to the results page
    if (quizItem.length === 0) {
      setShowResult(true);
      return;
    }
    //    if there are more questions, get the next question
    setAnswer("");
    getQuestion();
  };

  if (showResult) {
    return <FlashCardResultPage />;
  } else {
    return (
      <div className={"flex flex-col items-center"}>
        <FlashcardQuestionItem question={currentQuestion?.question} />
        <div className={"mt-8 grid w-full grid-cols-2 gap-4"}>
          {choices.map((choice, index) => (
            <FlashcardAnswerButton
              key={index}
              answer={choice}
              clickHandler={() => answerClickHandler(choice)}
              isActive={answer === choice}
            />
          ))}
        </div>
        <button
          onClick={() => onNext()}
          className={"btn btn-primary btn-wide mt-10"}
        >
          Next
        </button>
      </div>
    );
  }
};

export default FlashcardPage;
