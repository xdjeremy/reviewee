import React from "react";
import { useReview } from "./Review.provider";
import ShowQuizCard from "./ShowQuiz.card";

const ShowQuizPage = () => {
  const { items } = useReview();
  return (
    <div
      className={"mx-auto flex w-full max-w-2xl flex-col items-center gap-8"}
    >
      {items.map((item) => {
        return (
          <ShowQuizCard
            front={item.question}
            back={item.answer}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default ShowQuizPage;
