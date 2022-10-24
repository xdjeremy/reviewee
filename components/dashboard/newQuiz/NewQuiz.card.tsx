import React, { FC, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { toast } from "react-hot-toast";
import { supabase } from "../../../utils";
import CarouselItem from "./Carousel.item";

interface quizAttempt {
  id: string;
  averageScore: number;
  userCompleted: number;
  title: string;
}

const NewQuizCard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [carouselItems, setCarouselItems] = useState<quizAttempt[]>();

  useEffectOnce(() => {
    const fetchCarouselItems = async () => {
      try {
        setIsLoading(true);

        //get the quiz list first (top 5 recent)
        const { data: quizData, error: quizError } = await supabase
          .from("quiz")
          .select("id, created_at, title")
          .order("created_at", { ascending: false })
          .limit(5);
        if (quizError) {
          toast.error(quizError.message);
        }

        const quizAttemptItems: quizAttempt[] = [];
        // we get the quiz average score & user completed
        const quizInfo = quizData?.map(async (quiz) => {
          const { data: attemptData, error: attemptError } = await supabase
            .from("quiz_attempt_items")
            .select("is_correct, quiz_attempt!inner(quiz, id)")
            .eq("quiz_attempt.quiz", quiz.id);

          // get average score
          const correctAnswer = attemptData?.filter(
            (item: any) => item.is_correct
          );
          let averageScore =
            correctAnswer &&
            attemptData &&
            (correctAnswer.length / attemptData.length) * 100;
          //limit to 2 decimal places
          averageScore = Math.round((averageScore || 0) * 100) / 100;

          // get user completed
          // only count the array item of the same quiz attempt once
          const userCompleted = attemptData?.filter(
            (item: any, index: number, self: any) =>
              index ===
              self.findIndex(
                (t: any) => t.quiz_attempt.id === item.quiz_attempt.id
              )
          ).length;

          quizAttemptItems.push({
            id: quiz.id,
            averageScore: averageScore,
            userCompleted: userCompleted || 0,
            title: quiz.title,
          });
        });

        await Promise.all(quizInfo || []);

        setCarouselItems(quizAttemptItems);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchCarouselItems().then(() => setIsLoading(false));
    console.log(carouselItems);
  });
  return (
    <div className={"flex flex-col gap-3"}>
      <span>
        <h3 className={"text-xl"}>
          Try out this{" "}
          <span
            className={
              "my-4 bg-gradient-to-r from-purple-500 to-green-400 bg-clip-text text-center text-xl font-bold uppercase text-transparent"
            }
          >
            Quizzes
          </span>{" "}
          created by other people!
        </h3>
      </span>
      <div className="carousel w-full rounded-xl">
        {
          // if the carousel is loading, show the loading animation
          isLoading ? (
            <div className={"flex items-center justify-center"}>
              <div className="loader h-12 w-12 rounded-full border-8 border-t-8 border-gray-200 ease-linear"></div>
            </div>
          ) : (
            // if the carousel is not loading, show the carousel items
            carouselItems?.map((item, index) => (
              <CarouselItem
                key={item.id}
                nextSlide={index === 4 ? "0" : `${index + 1}`}
                prevSlide={index === 0 ? "4" : `${index - 1}`}
                slideId={index.toString()}
                title={item.title}
                averageScore={item.averageScore}
                userCompleted={item.userCompleted}
                uniqId={item.id}
              />
            ))
          )
        }
      </div>
    </div>
  );
};

export default NewQuizCard;
