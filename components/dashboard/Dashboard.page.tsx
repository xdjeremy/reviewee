import React, { FC } from "react";
import StatsCard from "./stats/Stats.card";
import NewQuizCard from "./newQuiz/NewQuiz.card";

const DashboardPage: FC = () => {
  return (
    <div className={"flex flex-col gap-8"}>
      <StatsCard />
      <NewQuizCard />
    </div>
  );
};

export { DashboardPage };
