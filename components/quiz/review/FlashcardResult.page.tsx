import React, { FC } from "react";
import { useReview } from "./Review.provider";
import {classNames} from "../../../utils";

const FlashCardResultPage: FC = () => {
  const { answers, score, items } = useReview();
  return (
    <>
      <span>
        <h3 className={'text-xl text-center mb-7'}>Score: {score} / {items.length} </h3>
      </span>
      <div className={'flex flex-col items-center justify-center w-full max-w-2xl mx-auto gap-5'}>
        {answers.map((answer) => {
          return (
              <div key={answer.question} className={classNames(answer.isCorrect ? 'bg-success' : 'bg-error','p-10 w-full rounded-lg flex flex-col')}>
                <p className={'text-center font-semibold'}>{answer.question}</p>
                <p className={'text-center text-xl'}>{answer.answer}</p>
                <p className={classNames(answer.isCorrect ? 'text-success-content' : 'text-error-content', 'text-md text-center')}>{!answer.isCorrect && `Correct answer: ${answer.correctAnswer}`}</p>
              </div>
          );
        })}
      </div>
    </>
  );
};

export default FlashCardResultPage;
