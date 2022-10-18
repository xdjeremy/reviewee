import React, { FC, MouseEventHandler } from "react";
import { classNames } from "../../../utils";

interface Props {
  answer: string;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
}

const FlashcardAnswerButton: FC<Props> = ({
  answer,
  clickHandler,
  isActive = false,
}) => {
  return (
    <button
      onClick={clickHandler}
      className={classNames(
        isActive ? "bg-success text-success-content" : "bg-base-100",
        "rounded-lg  p-5 shadow-sm hover:-translate-y-0.5"
      )}
    >
      {answer}
    </button>
  );
};

export default FlashcardAnswerButton;
