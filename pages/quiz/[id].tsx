import { NextPage } from "next";
import React from "react";
import { ReviewPage } from "../../components/quiz";
import { ReviewProvider } from "../../components/quiz/review/Review.provider";

const QuizId: NextPage = () => {
  return (
    <>
      <ReviewProvider>
        <ReviewPage />
      </ReviewProvider>
    </>
  );
};

export default QuizId;
