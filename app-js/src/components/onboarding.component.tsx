
"use client";

import { useEffect, useState } from "react";

export interface StepInfo {
  title: string;
  mainText: string;
  secondaryText: string;
  imageSrc?: string;
  currentPage: number;
  amountOfPages: number;
}

export interface OnboardingInfoProps {
  steps: StepInfo[];
}

interface StepPresenter {
  info: StepInfo;
  moveToNext: () => void;
  moveToPrevious: () => void;
  onSkip: () => void;
}

function StepPresenter({ info, moveToNext, moveToPrevious, onSkip }: StepPresenter) {
  const { title, mainText, secondaryText, imageSrc, currentPage, amountOfPages } = info;
  return (
   <div
    className="
      w-full
      h-full
      flex
      flex-col
      items-center
      justify-between
      gap-3
      p-3
    ">
    <div className="w-full flex items-start justify-between">
      <h2 className="font-bold text-4xl">{ title }</h2>
      <span>{currentPage}/{amountOfPages}</span>
    </div>
    <p className="text-3xl">{ mainText }</p>
    <p className="text-xl">{ secondaryText }</p>
    {
      imageSrc &&
      <img
        className="md:h-72"
        alt="stage info" 
        src={imageSrc}/>
    }
    <div className="flex w-full items-center justify-between">
      <button
        onClick={onSkip}
        className="bg-blue-500 hover:bg-blue-300 text-white p-1">Skip</button>
      <div className="flex gap-3">
        {
          !(currentPage === 1) &&
          <button
            onClick={moveToPrevious}
            className="bg-blue-500 hover:bg-blue-300 text-white p-1">Previous</button>
        }
        <button
          onClick={currentPage === amountOfPages ? onSkip : moveToNext}
          className="bg-blue-500 hover:bg-blue-300 text-white p-1">
          { currentPage === amountOfPages ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
   </div>
  );
}

export function OnboardingInfo({ steps }: OnboardingInfoProps) {
  const [step, setStep] = useState(steps[0]);
  const [shouldSkip, setShouldSkip] = useState(false);

  const seeNext = () => {
    const currentPageIsTheLast = step.currentPage - 1 + 1 >= steps.length;
    if (currentPageIsTheLast) {
      return;
    }
    setStep(steps[step.currentPage - 1 + 1]);
  };

  const seePrevious = () => {
    const currentPageIsTheFirst = step.currentPage - 1 - 1 < 0;
    if (currentPageIsTheFirst) {
      return;
    }
    setStep(steps[step.currentPage - 1 - 1]);
  };

  useEffect(() => {}, [step]);

  return (
    <div
      className={`
        ${shouldSkip ? 'hidden' : ''}
        absolute
        md:z-100
        md:h-screen
        md:w-screen
        flex
        items-center
        justify-center
      `}>
      <div className="
        border-2
        m-3
        md:m-0
        border-black
        bg-white
        md:w-6/12
        md:h-2/3
      ">
        <StepPresenter
          onSkip={() => setShouldSkip(true)}
          moveToNext={seeNext}
          moveToPrevious={seePrevious}
          info={step} />
      </div>
    </div>
  );
}
