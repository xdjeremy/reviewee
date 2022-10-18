import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { QuizItems, useReview } from "./Review.provider";
import { useEffectOnce } from "usehooks-ts";
import FlashcardQuestionItem from "./FlashcardQuestion.item";
import FlashcardAnswerButton from "./FlashcardAnswer.button";
import FlashCardResultPage from "./FlashcardResult.page";
import { supabase } from "../../../utils";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const FlashcardPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { items, setQuizItem, quizItem, setScore, score, setAnswers, answers } =
    useReview();
  const [currentQuestion, setCurrentQuestion] = useState<QuizItems>({
    question: "",
    answer: "",
    id: "",
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

  const onNext = async () => {
    // add the result to the answers array
    const result = {
      question: currentQuestion.question,
      answer: answer,
      correctAnswer: currentQuestion.answer,
      id: currentQuestion.id,
      isCorrect: answer === currentQuestion.answer,
    };
    // setAnswers([...answers, result]);
    setAnswers([...answers, result]);

    //    check if the answer is correct
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
    //    if there are no more questions, go to the results page
    if (quizItem.length === 0) {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        console.log(id);
        const { data: quizAttemptData, error: quizAttemptError } =
          await supabase
            .from("quiz_attempts")
            .insert({
              quiz: id,
              owner: user?.id,
            })
            .select("id");
        if (quizAttemptError) throw quizAttemptError;

        // save the results
        const { error } = await supabase.from("quiz_attempt_items").insert(
          answers.map((answer) => ({
            quiz_item: answer.id,
            answer: answer.answer,
            is_correct: answer.isCorrect,
            owner: user?.id,
            quiz_attempt: quizAttemptData[0].id,
          }))
        );
        if (error) throw error;

        setShowResult(true);
        return;
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
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
