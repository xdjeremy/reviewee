import React, { FC } from "react";
import Link from "next/link";

interface Props {
  nextSlide: string;
  prevSlide: string;
  slideId: string;
  title: string;
  averageScore: number;
  userCompleted: number;
  uniqId: string;
}

const CarouselItem: FC<Props> = ({
  nextSlide,
  slideId,
  prevSlide,
  title,
  averageScore,
  userCompleted,
  uniqId,
}) => {
  return (
    <div id={slideId} className="carousel-item relative w-full">
      <Link href={`/quiz/${uniqId}`}>
        <button
          className={
            "group flex w-full cursor-pointer flex-col items-center justify-center bg-white py-10 shadow-sm"
          }
        >
          <h3
            className={
              "from-purple-500 to-green-400 text-3xl font-semibold group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent"
            }
          >
            {title}
          </h3>
          <div className={"mt-4 flex flex-col items-center text-left"}>
            <span>Average score: {averageScore}%</span>
            <span>Completed by {userCompleted} users</span>
          </div>
        </button>
      </Link>
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href={`#${prevSlide}`} className="btn-circle btn">
          ❮
        </a>
        <a href={`#${nextSlide}`} className="btn-circle btn">
          ❯
        </a>
      </div>
    </div>
  );
};

export default CarouselItem;
