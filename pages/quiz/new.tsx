import { NextPage } from "next";
import React, { createContext, ReactNode, useState } from "react";
import { Layout } from "../../components/layout";
import { AddQuestion, QuizInput } from "../../components/quiz";
import { useForm } from "react-hook-form";
import { useCounter } from "usehooks-ts";
import { toast } from "react-hot-toast";
import { classNames, supabase } from "../../utils";
import { useRouter } from "next/router";
import * as cleanTextUtils from "clean-text-utils";
import ConvertApi from "convertapi-js";

interface QuestionAndAnswer {
  question: string;
  answer: string;
  quiz: string;
}

interface Item {
  number: number;
  component: ReactNode;
}

export const NewQuizContext = createContext({
  items: [] as Item[],
  setItems(_items: Item[]) {},
});

const NewQuiz: NextPage = () => {
  const { count, increment, setCount } = useCounter(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);

  const addQuestion = () => {
    setItems([
      ...items,
      {
        number: count,
        component: (
          <QuizInput
            register={register}
            number={count}
            key={count}
            error={errors[`question${count}`]}
          />
        ),
      },
    ]);
    increment();
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (items.length === 0) {
        return toast.error("Please add at least one question");
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        return toast.error(userError.message);
      }

      const { data: quizData, error: quizError } = await supabase
        .from("quiz")
        .insert({
          owner: user?.id,
          title: getValues("title"),
        })
        .select("id");
      if (quizError) {
        return toast.error(quizError.message);
      }

      const quizItems = items;
      let questionsAnswer: QuestionAndAnswer[] = [];
      quizItems.forEach((item) => {
        const question = getValues(`question${item.number}`);
        const answer = getValues(`answer${item.number}`);
        const quiz = quizData[0].id;
        questionsAnswer.push({ question, answer, quiz });
      });

      const { error } = await supabase
        .from("quiz_items")
        .insert(questionsAnswer);
      if (error) {
        return toast.error(error.message);
      }

      // success
      toast.success("Quiz created successfully");
      await router.push(`/quiz/${quizData[0].id}`);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const importChangeHandler = async (event: any) => {
    const file = event.target.files[0];

    const convertApi = ConvertApi.auth("nszxwNriKaZ1WpoK");
    let params = convertApi.createParams();
    params.add("File", file);
    let result = await convertApi.convert("pdf", "txt", params);

    const url = result.files[0].Url;

    const response = await fetch(url);
    const data = await response.text();

    // delete empty lines
    const text = cleanTextUtils.strip.newlines(data);

    //  split data by period
    const lines = text.split(".");

    const uploadQuizItems = lines.map((line, index) => {
      const [question, answer] = line.split("?");
      const itemCount = count + index;
      setValue(`question${itemCount}`, question, { shouldValidate: true });
      setValue(`answer${itemCount}`, answer, { shouldValidate: true });
      return {
        number: itemCount,
        component: (
          <QuizInput
            register={register}
            number={itemCount}
            key={itemCount}
            error={errors[`question${itemCount}`]}
          />
        ),
      };
    });

    setItems([...items, ...uploadQuizItems]);
    setCount(count + lines.length);
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5"
      >
        <p className="w-full text-left italic text-red-500">
          {errors.title?.message as string}
        </p>
        <span className="flex w-full flex-col justify-between gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="Quiz Title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
              maxLength: {
                value: 50,
                message: "Title must be at most 50 characters",
              },
            })}
            className={classNames(
              errors.title?.message ? "input-error" : "",
              "input-bordered input w-full max-w-lg"
            )}
          />
          <input
            type={"file"}
            disabled={isLoading}
            onChange={importChangeHandler}
          />
          <button
            type="submit"
            className={classNames(isLoading ? "loading" : "", "btn-info btn")}
            disabled={isLoading}
          >
            Save
          </button>
        </span>
        <NewQuizContext.Provider
          value={{
            items,
            setItems,
          }}
        >
          {items.map((item: Item) => item.component)}
        </NewQuizContext.Provider>
        <AddQuestion addQuestion={addQuestion} />
      </form>
    </Layout>
  );
};

export default NewQuiz;
