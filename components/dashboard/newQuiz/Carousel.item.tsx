import React, { FC } from "react";

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
      <div
        className={
          "flex w-full flex-col items-center justify-center bg-white py-10 shadow-sm"
        }
      >
        <h3 className={"text-3xl font-semibold"}>{title}</h3>
        <div className={"mt-4 flex flex-col items-center text-left"}>
          <span>Average score: {averageScore}%</span>
          <span>Completed by {userCompleted} users</span>
        </div>
      </div>
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
