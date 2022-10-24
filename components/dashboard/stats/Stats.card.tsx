import React, { FC } from "react";
import QuizCountItem from "./QuizCount.item";
import AverageScoreItem from "./AverageScore.item";
import TotalQuizCount from "./TotalQuizCount.item";

const StatsCard: FC = () => {
  return (
    <div className="stats w-full shadow">
      <QuizCountItem />

      <AverageScoreItem />

      <TotalQuizCount />
    </div>
  );
};

export default StatsCard;
