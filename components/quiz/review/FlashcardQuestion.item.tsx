import {FC} from "react";

interface Props {
    question: string;
}

const FlashcardQuestionItem: FC<Props> = ({question}) => {
    return (
        <div
            className={'bg-base-100 rounded-md p-5 text-center w-full max-w-lg mx-auto h-52 flex flex-col items-center justify-center border-blue-500 border'}>
            <span className={'font-semibold text-xl'}>
                {question}
            </span>
        </div>
    )
}

export default FlashcardQuestionItem
