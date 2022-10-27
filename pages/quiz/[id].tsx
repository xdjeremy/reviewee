import { NextPage } from "next";
import React from "react";
import { ReviewPage } from "../../components/quiz";
import { ReviewProvider } from "../../components/quiz/review/Review.provider";

// todo: check if quiz id is valid, if not redirect to 404

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
