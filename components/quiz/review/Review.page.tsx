import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../../../utils";
import { Layout } from "../../layout";
import { Action, QuizItems, useReview } from "./Review.provider";
import { ReviewQuizButton } from "./ReviewQuiz.button";
import { ShowQuizButton } from "./ShowQuiz.button";
import FlashcardPage from "./Flashcard.page";
import ShowQuizPage from "./ShowQuiz.page";
import LeaderboardItem from "./Leaderboard.item";

const ReviewPage: FC = () => {
  const { setQuizTitle, setItems, quizTitle, action, setQuizItem } =
    useReview();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getQuiz = new Promise(async (resolve, reject) => {
      if (id === undefined) return;
      const {
        data,
        error,
      }: {
        data: any;
        error: any;
      } = await supabase
        .from("quiz_items")
        .select(`question, answer, quiz(title), id`)
        .eq("quiz", id);

      if (error) {
        reject(error);
      }

      if (data) {
        setQuizTitle(data[0].quiz.title);
        setItems(data);
        resolve(data as QuizItems[]);
      }
    });
    getQuiz
      .then((data) => {
        toast.success("Quiz loaded");
        //	randomize quiz Items
        // @ts-ignore
        setQuizItem(data.sort(() => Math.random() - 0.5));
      })
      .catch((error) => {
        router.push("/quiz").then((r) => toast.error(error.message));
      });
  }, [setItems, setQuizTitle, id, setQuizItem, router]);

  const renderPage = () => {
    switch (action) {
      case Action.PICKING:
        return (
          <div className={"flex flex-col gap-5"}>
            <div className="mx-auto flex w-full flex-col justify-center gap-5 divide-y rounded-lg bg-base-100 shadow-sm lg:flex-row lg:divide-x">
              <ReviewQuizButton />
              <ShowQuizButton />
            </div>
            <LeaderboardItem />
          </div>
        );
      case Action.REVIEW:
        return <FlashcardPage />;
      case Action.SHOW:
        return <ShowQuizPage />;
    }
  };

  return (
    <Layout>
      <h2 className="mx-auto mb-7 w-full text-3xl font-semibold">
        {quizTitle}
      </h2>
      {renderPage()}
    </Layout>
  );
};

export { ReviewPage };
