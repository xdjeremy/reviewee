import React, {FC, useState} from 'react';
import ReactCardFlip from "react-card-flip";

interface Props {
    isFlipped?: boolean;
    front: string;
    back: string;
}

const ShowQuizCard: FC<Props> = ({isFlipped = false, front, back}) => {
    const [isFlippedState, setIsFlippedState] = useState(isFlipped);

    const toggle = () => {
        setIsFlippedState(!isFlippedState);
    }
    return (
        <div className={'w-full'}>
        <ReactCardFlip isFlipped={isFlippedState}>
            <div className={'bg-base-100 w-full px-8 py-20 rounded-lg text-center text-xl cursor-pointer'} onClick={toggle}>
                {front}
            </div>
            <div className={'bg-base-300 w-full px-8 py-20 rounded-lg text-center text-xl cursor-pointer'} onClick={toggle}>
                {back}
            </div>
        </ReactCardFlip>
        </div>
    );
};

export default ShowQuizCard;
